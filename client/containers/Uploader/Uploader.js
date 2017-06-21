import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import Mask from './Mask';
import style from './index.scss';
@withRouter
export default class Uploader extends Component{
    constructor(props) {
        super(props)
        this.state = {
            result: null,
            showMask: false
        }
    }
    handleChangeFile(e) {
        const reader = new FileReader();
        reader.readAsDataURL(this.input.files[0]);
        reader.onload = (event) => {
            this.setState({
                result: event.target.result,
                showMask: true
            })
        }
    }
    render() {
        return (
            <div className={style.uploader}>
                <a className={style.file_wrapper}>
                    <input 
                        type='file' 
                        className={style.file_input} 
                        onChange={this.handleChangeFile.bind(this)}
                        ref={(input) => { this.input = input }}/>
                    点击上传文件  
                </a>
                {
                    this.state.showMask?
                    (
                        <Mask result={this.state.result}/>
                    ):
                    null
                }
            </div>
        )
    }
}