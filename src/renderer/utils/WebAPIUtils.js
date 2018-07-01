import axios from 'axios';
import Debug from 'debug';
import qs from 'qs';
import 'babel-polyfill';

import { signedIn } from '../actions/users';

const isDev = require('electron-is-dev');
import { host } from './host';

const debug = Debug('fabnavi:api');

class Server {
    constructor() {
        this.dispatch = null;
        this.store = null;
    }

    init(store) {
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
                    .then(({ headers }) => {
                        resolve(headers);
                    })
                    .catch(error => {
                        debug('error to login ', error);
                        reject(error);
                    });
            }
            if(isDev && host.url.includes('localhost')) resolve({});

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
                    .then(({ id }) => {
                        resolve(id);
                    })
                    .catch(error => {
                        debug('error to login ', error);
                        reject(error);
                    });
            }
        });
    }

    loadCredential() {
        try{
            debug(
                'loda credential: ',
                JSON.parse(localStorage.getItem('credential'))
            );
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
            responseType: 'json',
            type: 'GET',
            headers,
            url: `${host.url}/api/v1/current_user.json`
        }).then(response => {
            debug(response);
            const id = response.data.id;
            const isAdmin = response.data.is_admin;
            this.saveUserId(id);
            this.saveCredential(headers);
            this.dispatch(
                signedIn({
                    credential: headers,
                    id,
                    isAdmin
                })
            );
            return {
                headers,
                id
            };
        });
    }

    async getProject(id) {
        debug(`getProject id:${id}`);

        return axios({
            responseType: 'json',
            type: 'GET',
            headers: await this.prepareHeaders(),
            url: `${host.url}/api/v1/projects/${id}.json`
        });
    }

    async fetchOwnProjects() {
        debug('getOwnProjects');
        const headers = await this.prepareHeaders();
        const url = `${host.url}/api/v1/users/${this.store.getState().user.id}/projects.json?`;
        return axios({
            responseType: 'json',
            method: 'GET',
            headers,
            url
        });
    }

    async fetchAllProjects(page, perPage, offset) {
        debug('fetchAllProjects', page);
        const query = qs.stringify({
            page: page + 1 || 1,
            per_page: perPage || 8,
            offset: offset || 0
        });
        const url = `${host.url}/api/v1/projects.json?${query}`;
        return axios({
            responseType: 'json',
            method: 'GET',
            url
        });
    }

    async getAllProjects(page, perPage, offset) {
        debug('getAllProjects');
        const url = `${host.url}/api/v1/projects.json`;
        this.dispatch({
            type: 'FETCHING_PROJECTS',
            url
        });
        return axios({
            responseType: 'json',
            data: {
                page: page || 0,
                perPage: perPage || 20,
                offset: offset || 0
            },
            method: 'GET',
            url
        }).then(({ data }) => {
            this.dispatch({
                type: 'UPDATE_PROJECTS',
                projects: data
            });
        });
    }

    async getTopProject(page, perPage, offset) {
        debug('getTopProject');
        const query = qs.stringify({
            page: page + 1 || 1,
            per_page: 1,
            offset: offset || 0
        });
        const url = `${host.url}/api/v1/projects.json?${query}`;
        return axios({
            responseType: 'json',
            method: 'GET',
            url
        }).then(({ data }) => {
            if(
                data[0].id !== this.store.getState().manager.projects.allIds[0]
            ) {
                this.dispatch({
                    type: 'WILL_UPDATE_PROJECT_LIST'
                });
            }
        });
    }

    async createProject(name, contentAttributesType, description) {
        debug('createProject');
        return axios({
            responseType: 'json',
            data: {
                project: {
                    name: name,
                    content_attributes: {
                        description: description,
                        type: 'Content::PhotoList'
                    }
                }
            },
            headers: await this.prepareHeaders(),
            method: 'post',
            url: `${host.url}/api/v1/projects.json`
        }).then(res => {
            this.updateProject({
                id: res.id,
                name: res.name,
                content: [],
                description: description
            });
        });
    }

    async setThumbnailLast(project) {
        if(project.content.length == 0) return;
        const fd = new FormData();
        fd.append('project[name]', project.name);
        fd.append(
            'project[figure_id]',
            project.content[project.content.length - 1].figure.figure_id
        );
        return axios({
            responseType: 'json',
            headers: await this.prepareHeaders(),
            method: 'patch',
            data: fd,
            url: `${host.url}/api/v1/projects/${project.id}.json`
        });
    }

    async updateProject(project) {
        debug('updateProject', project);
        const data = {
            project: {
                name: project.name,
                description: project.description,
                tag_list: project.tag_list,
                private: project.private,
                content_attributes: {
                    figures_attributes: project.figures.map(figure => {
                        return {
                            id: figure.figure_id,
                            // type: figure.type,
                            captions_attributes: figure.captions.map(
                                caption => {
                                    return {
                                        id: caption.id,
                                        text: caption.text,
                                        start_sec: caption.start_sec,
                                        end_sec: caption.end_sec,
                                        _destroy: caption._destroy
                                    };
                                }
                            )
                        };
                    })
                }
            }
        };

        return axios({
            responseType: 'json',
            headers: await this.prepareHeaders(),
            method: 'patch',
            data: data,
            url: `${host.url}/api/v1/projects/${project.id}.json`
        });
    }

    async deleteProject(id) {
        debug('deleteProject', id);
        return axios({
            responseType: 'json',
            headers: await this.prepareHeaders(),
            method: 'delete',
            url: `${host.url}/api/v1/projects/${id}.json`
        });
    }

    async searchProjects(word) {
        const query = qs.stringify({
            page: 1,
            per_page: 20,
            offset: 0,
            q: word || ''
        });
        const url = `${host.url}/api/v1/projects?${query}`;
        return axios({
            responseType: 'json',
            method: 'GET',
            url: url
        });
    }

    async reloadProjects(_query) {
        const query = qs.stringify({
            page: 1,
            per_page: 20,
            offset: 0,
            q: _query || ''
        });
        const url = `${host.url}/api/v1/projects?${query}`;
        return axios({
            responseType: 'json',
            method: 'GET',
            url: url
        });
    }

    async uploadFile(file, name) {
        debug('uploadFile');

        const fd = new FormData();
        fd.append('attachment[file]', file, name);

        return axios({
            responseType: 'json',
            data: fd,
            headers: await this.prepareHeaders(),
            method: 'post',
            url: `${host.url}/api/v1/attachments.json`
        });
    }

    async signOut() {
        debug('Sign out');
        return axios({
            url: `${host.url}/auth/sign_out`,
            method: 'delete',
            responseType: 'json',
            headers: await this.prepareHeaders()
        })
            .then(() => debug('sign out: success'))
            .catch(err => debug('sign out: failed', err));
    }
}

const api = new Server();
window.api = api;
export default api;
