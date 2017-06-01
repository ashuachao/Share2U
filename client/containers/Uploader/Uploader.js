import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import style from './index.scss';
@withRouter
export default class Uploader extends Component{
    constructor(props) {
        super(props)
        this.state = {
            count: 1
        }
    }
    componentWillMount() {
        this.timer = setInterval(()=> {
            console.log('22222');
            let newCount = this.state.count + 3;
            console.log(newCount);
            this.setState({
                count: newCount
            })
        }, 5000);
    }
    componentWillUnMount() {
        clearInterval(this.timer);
    }
    render() {
        return (
            <div className={style.uploader}>
                <a className={style.file_wrapper}>
                    <input type='file' className={style.file_input}/>点击上传文件  
                </a>
                {this.state.count}
            </div>
        )
    }
}