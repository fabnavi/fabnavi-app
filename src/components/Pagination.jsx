import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';

export default class Pagination extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            pageCount: 0
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.data.length === 0) {
            return;
        }
        const data = nextProps.data;
        const startingPage = this.props.startingPage ?
            this.props.startingPage :
            1;
        const pageSize = this.props.pageSize;
        let pageCount = parseInt(data.length / pageSize);
        if(data.length % pageSize > 0) {
            pageCount++;
        }
        this.setState({
            currentPage: startingPage,
            pageCount: pageCount
        });
    }

    setCurrentPage(num) {
        this.setState({ currentPage: num });
    }

    createControls() {
        const controls = [];
        const pageMove = this.state.currentPage;
        const pageCount = this.state.pageCount;
        if(pageCount >= 7) {
            for(let i = pageMove; i <= pageCount; i++) {
                const baseClassName = 'pagination-controls__button';
                const activeClassName = i === this.state.currentPage ? `${baseClassName}--active` : '';
                controls.push(
                    <div key={i}>
                        <div
                            className={`${baseClassName} ${activeClassName}`}
                            onClick={() => this.setCurrentPage(i)}
                        >
                            {i}
                        </div>
                    </div>
                );
            }
            return controls;
        }
        for(let i = 1; i <= pageCount; i++) {
            const baseClassName = 'pagination-controls__button';
            const activeClassName = i === this.state.currentPage ? `${baseClassName}--active` : '';
            controls.push(
                <div key={i}>
                    <div
                        className={`${baseClassName} ${activeClassName}`}
                        onClick={() => this.setCurrentPage(i)}>
                        {i}
                    </div>
                </div>
            );
        }
        return controls;

    }

    createControlsfirst() {
        const controls = [];
        const pageCount = this.state.pageCount;
        const baseClassName = 'pagination-controls__button';
        const currentpage = this.state.currentPage;
        if(currentpage == 1) {
            return;
        }
        controls.push(
            <div key={pageCount}
                className={`${baseClassName}`}
                onClick={() => this.setCurrentPage(currentpage - 1)}
            >
                {'prev'}
            </div>
        )
        return controls;

    }

    createControlslast() {
        const controls = [];
        const pageCount = this.state.pageCount;
        const baseClassName = 'pagination-controls__button';
        const currentpage = this.state.currentPage;
        if(pageCount == currentpage) {
            return;
        }
        controls.push(
            <div key={pageCount}
                className={`${baseClassName}`}
                onClick={() => this.setCurrentPage(currentpage + 1)}
            >
                {'next'}
            </div>
        )
        return controls;

    }

    createPaginateData() {
        const data = this.props.data;
        const pageSize = this.props.pageSize;
        const currentPage = this.state.currentPage;
        const upperLimit = currentPage * pageSize;
        const dataSlice = data.slice((upperLimit - pageSize), upperLimit);
        return dataSlice;
    }

    render() {
        // this.makingProps(this.props.data)
        if(this.props.data.length === 0) {
            return (
                <div>
                    <p> Just Moment Please</p>
                </div>
            )
        }
        return (
            <div className="projectbox">
                <div className="paginationbox">
                    <div className="prev">
                        {this.createControlsfirst()}
                    </div>
                    <div className="number">
                        {this.createControls()}
                    </div>
                    <div className="next">
                        {this.createControlslast()}
                    </div>
                </div>
                <div className="projectlistbox">
                    {cloneElement(this.props.children, { data: this.createPaginateData(), selector: this.props.selector })}
                </div>
            </div>
        )


    }
}

Pagination.propTypes = {
    pageSize: PropTypes.number,
    startingPage: PropTypes.number,
    children: PropTypes.element,
    selector: PropTypes.object,
    data: PropTypes.array
};
Pagination.defaultProps = {
    pageSize: 8,
    startingPage: 1
};
