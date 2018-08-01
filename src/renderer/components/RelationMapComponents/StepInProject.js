import React from 'react';
import PropTypes from 'prop-types';
import Debug from 'debug';
import { Group, Text, Tag, Label, Image, Line } from 'react-konva';

const debug = Debug('fabnavi:js:StepInProject');

export default class StepInProject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null,
            imgsrc: this.props.src,
            imageW: 0,
            imageH: 0,
            caption: [
                'ハサミでいい感じの大きさに紙を切る',
                'Step1の紙に切り込みを入れて，組み合わせる',
                '折り曲げたストローと組み合わせて完成！'
            ],
            showTopRelation: false,
            showLastRelation: false
        };
        this.onShowingRelation = index => {
            debug(`${index} caption - show related contents`);
            if(index === 0) {
                this.setState({ showTopRelation: !this.state.showTopRelation });
            }
            if(index === 2) {
                this.setState({ showLastRelation: !this.state.showLastRelation });
            }
        };
    }

    componentDidMount() {
        const image = new window.Image();
        image.src = this.state.imgsrc;
        image.onload = () => {
            this.setState({
                image: image,
                imageW: image.width,
                imageH: image.height
            });
        };
    }

    render() {
        const w = window.innerWidth;
        const h = window.innerHeight;
        const _imageW = this.state.imageW * 0.8;
        const _imageH = this.state.imageH * 0.8;
        const halfImgW = _imageW / 2;
        const halfImgH = _imageH / 2;
        const topH = 100;
        const _d = 550;
        const sanitizeImgPosX = w / 2 - halfImgW - _d;
        const index = this.props.order;
        const flowMargin = 220;
        const sanitizeImgPosY = topH + index * flowMargin;
        const wlx = w / 2 - _d;
        const wly = topH + _imageH + index * flowMargin;
        const lx = 0;
        const ly1 = 0;
        const ly2 = flowMargin / 2;
        const size = this.props.size;
        const labelPosX = w / 2 + halfImgW + 5 - _d;
        const labelPosY = topH + index * flowMargin + halfImgH;
        return (
            <Group>
                <Image
                    x={sanitizeImgPosX}
                    y={sanitizeImgPosY}
                    width={_imageW}
                    height={_imageH}
                    image={this.state.image}
                />
                {index >= size - 1 ? (
                    <Line x={0} y={0} points={[0, 0, 0, 0]} stroke="white" strokeWidth={1} />
                ) : (
                    <Line x={wlx} y={wly} points={[lx, ly1, lx, ly2]} stroke="blue" strokeWidth={5} />
                )}
                <Label x={labelPosX} y={labelPosY} onClick={() => this.onShowingRelation(index)}>
                    <Tag
                        fill="black"
                        pointerDirection="left"
                        pointerWidth={10}
                        pointerHeight={10}
                        lineJoin="round"
                        shadowColor="black"
                    />
                    <Text
                        text={`Step${index + 1}: ${this.state.caption[index]}`}
                        fontFamily="Calibri"
                        fontSize={12}
                        padding={10}
                        fill="#fff"
                    />
                </Label>
                {this.state.showTopRelation && <Text x={w / 2} y={h / 2} text="yeah yeah" fontSize={12} fill="black" />}
                {this.state.showLastRelation && (
                    <Text x={w / 2 + 200} y={h / 2} text="yo yo" fontSize={12} fill="black" />
                )}
            </Group>
        );
    }
}
