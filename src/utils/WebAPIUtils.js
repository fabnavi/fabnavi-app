import axios from 'axios';
import Debug from 'debug';
import 'babel-polyfill';

import Act from "../actions/Types";
import { signedIn } from "../actions/users";

const debug = Debug('fabnavi:api');

class Server {
  constructor() {
    this.dispatch = null;
    this.store = null;
  }

  init (store) {
    this.dispatch = store.dispatch;
    this.store = store;
    this.prepareHeaders();
  }

  prepareHeaders() {
    return new Promise((resolve, reject) => {
      const user = this.store.getState().user;
      if(user.isLoggedIn) {
        resolve(user.credential);
      }
      const maybeCredential = this.loadCredential();
      if(maybeCredential) {
        this.getCurrentUserInfo(maybeCredential)
        .then(({headers}) => { resolve(headers); })
        .catch(error => {
          debug('error to login ', error)
          reject(error);
        });
      }
      // TODO: throw error action to reducer
    });
  }

  prepareUserId() {
    return new Promise((resolve, reject) => {
      const userId = this.store.getState().user.id;
      if(userId) {
        resolve(userId);
      }
      const maybeUserId = this.loadUserId();
      if(maybeUserId) {
        this.getCurrentUserInfo()
        .then(({ id }) => { resolve(id); })
        .catch(error => {
          debug('error to login ', error)
          reject(error);
        });
      }
    });
  }

  loadCredential () {
    try{
      return JSON.parse(localStorage.getItem('credential'));
    } catch(e) {
      debug('Failed to load credential');
      return null;
    }
  }
  
  saveCredential(cred) {
    localStorage.setItem('credential', JSON.stringify(cred));
  }

  clearCredential() {
    localStorage.removeItem('credential');
  }

  loadUserId() {
    try{
      return JSON.parse(localStorage.getItem('userId'));
    } catch(e) {
      debug('Failed to load credential');
      return null;
    }
  }

  saveUserId(id) {
    localStorage.setItem('userId', id);
  }

  clearUserId() {
    localStorage.removeItem('userId');
  }

  getCurrentUserInfo(headers) {
    debug('get current user', headers);
    if(headers == null) {
      debug(headers);
      return Promise.reject('header is invalid');
    }
    return axios({
      responseType : 'json',
      type : 'GET',
      headers,
      url : '/api/v1/current_user.json'
    })
    .then(response => {
      const id = response.data.id;
      this.saveUserId(id);
      this.saveCredential(headers);
      this.dispatch(signedIn({
        credential: headers,
        id
      }));
      return {
        headers,
        id
      };
    });
  }

  async getProject( id ) {
    debug(`getProject id:${id}`);
    const headers = await this.prepareHeaders();

    return axios({
      responseType : 'json',
      type : 'GET',
      headers: headers,
      url : `/api/v1/projects/${id}.json`
    })
    .then(({ data }) => {
      this.dispatch({
        type: 'RECEIVE_PROJECT',
        project: data
      });
    });
  }

  async getOwnProjects() {
    debug('getOwnProjects');
    const headers = await this.prepareHeaders();
    debug(this.store.getState().user);
    const url = `/api/v1/users/${this.store.getState().user.id}/projects.json`;
    this.dispatch({
      type: 'FETCHING_PROJECTS',
      url
    });
    return axios({
      responseType : 'json',
      method : 'GET',
      headers,
      url
    })
    .then(({ data }) => {
      this.dispatch({
        type: 'RECEIVE_PROJECTS',
        projects: data,
        kind: 'owned'
      });
    });
  }

  async getAllProjects( page, perPage, offset ) {
    debug('getAllProjects');
    const url = '/api/v1/projects.json';
    this.dispatch({
      type: 'FETCHING_PROJECTS',
      url
    });
    return axios({
      responseType : 'json',
      data : {
        page : page || 0,
        perPage : perPage || 20,
        offset : offset || 0
      },
      method : 'GET',
      url
    })
    .then(({ data }) => {
      this.dispatch({
        type: 'RECEIVE_PROJECTS',
        projects: data,
        kind: 'all'
      });
    });
  }


  async createProject( name, contentAttributesType, description) {
    debug('createProject');
    return axios({
      responseType : 'json',
      data : {
        'project' : {
          'name' : name,
          'content_attributes' : {
            'description' : description,
            'type' : 'Content::PhotoList'
          }
        }
      },
      headers : await this.prepareHeaders(),
      method : 'post',
      url : '/api/v1/projects.json'
    })
    .then(res => {
      this.updateProject({
        id: res.id,
        name: res.name,
        content : [],
        description : description,
      });
    });
  }

  async setThumbnailLast( project ) {
    if(project.content.length == 0) return;
    const fd = new FormData();
    fd.append('project[name]', project.name);
    fd.append('project[figure_id]', project.content[project.content.length - 1].figure.figure_id);
    return axios({
      responseType : 'json',
      headers : await this.prepareHeaders(),
      method : 'patch',
      data  : fd,
      url : `/api/v1/projects/${project.id}.json`
    });
  }

  async updateProject( project ) {
    debug('updateProject', project);
    const fd = new FormData();
    fd.append('project[name]', project.name);
    fd.append('project[description]', project.description);
    fd.append('project[tag_list]', project.tag_list);
    fd.append('project[private]', project.private);

    let i;
    for(i = 0; i < project.content.length; i++) {

      if( project.content[i].figure.hasOwnProperty('_destroy') &&
        project.content[i].figure._destroy == true &&
        project.content[i].figure.figure_id != null ) {

        debug('Delete photo', project.content[i]);
        fd.append('project[content_attributes][figures_attributes][][type]', 'Figure::Photo');
        fd.append('project[content_attributes][figures_attributes][][attachment_id]', project.content[i].figure.id);
        fd.append('project[content_attributes][figures_attributes][][id]', project.content[i].figure.figure_id);
        fd.append('project[content_attributes][figures_attributes][][position]', i);
        fd.append('project[content_attributes][figures_attributes][][_destroy]', 'true');
      } else {
        fd.append('project[content_attributes][figures_attributes][][type]', 'Figure::Photo');
        fd.append('project[content_attributes][figures_attributes][][attachment_id]', project.content[i].figure.id);
        fd.append('project[content_attributes][figures_attributes][][position]', i);
        fd.append('project[content_attributes][figures_attributes][][_destroy]', 'false');
      }
    }

    return axios({
      responseType : 'json',
      headers : await this.prepareHeaders(),
      method : 'patch',
      data  : fd,
      url : `/api/v1/projects/${project.id}.json`
    });
  }

  async deleteProject( id ) {
    debug('deleteProject', id);
    return axios({
      responseType : 'json',
      headers : await this.prepareHeaders(),
      method : 'delete',
      url : `/api/v1/projects/${id}.json`
    });
  }

  async uploadFile( file, name ) {
    debug('uploadFile');

    const fd = new FormData();
    fd.append('attachment[file]', file, name);

    return axios({
      responseType : 'json',
      data : fd,
      headers : await this.prepareHeaders(),
      method : 'post',
      url : '/api/v1/attachments.json'
    });
  }

  async signOut() {
    debug('Sign out');
    return axios({
      url: '/auth/sign_out',
      method: 'delete',
      responseType: 'json',
      headers: await this.prepareHeaders()
    });
  }
}

const api = new Server();
window.api = api;
export default api;
