import React,{ Component } from 'react';
import { Carousel, WhiteSpace, WingBlank, Button } from 'antd-mobile';
import style from './index.scss';
export default class Mask extends Component{
    constructor(props) {
        super(props);
        this.state = {
            disabled: true
        };
    }
    componentWillMount() {
        if (this.props.result) {
            this.setState({
                disabled: false
            })
        } 
    }
    handleUpload() {
        axios.post('/api/user/profile', {
            dataUrl: this.props.result
        }).then((res) => {

        }).catch((error) => {

        })
    }
    render() {
        return (
            <div className={style.mask}>
                <img
                    className={style.pre_img}
                    src={this.props.result}/>
                <Button 
                    className={style.btn} 
                    onClick={this.handleUpload.bind(this)}
                    disabled={this.state.disabled}>
                    点击上传
                </Button>
            </div>
        )
    }
}