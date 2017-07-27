import React from 'react';
import Debug from 'debug';


const debug = Debug('fabnavi:jsx:Footer');

export default class Footer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <style jsx>{`
                    .belt {
                        background-color: white;
                        width: 100%;
                        height: 60px;
                        text-align:center;
                    }
                    hr{
                        width: 100%;
                        border: 0;
                        border-bottom: 1px dashed #ccc;
                        background: #fff;
                    }
                `}
                </style>
                <footer className="belt">
                    <hr />
                    <p>
                    fabnavi
                    </p>
                </footer>
            </div>
        );
    }
}
