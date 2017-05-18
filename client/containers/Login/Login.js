import React, { Component } from 'react'
import { addComment, testImutable } from '../../reducers/comment';
import { connect } from 'react-redux';
import { Carousel, WhiteSpace, WingBlank, Button } from 'antd-mobile';
import style from './Login.scss';

export default class Login extends Component{
    constructor(props) {
        super(props);
        this.state={
            data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'AiyWuByWklrrUDlFignR'],
            initialHeight: 400
        }
    }
    // shouldComponentUpdate(nextProps, nextState) {
    //     // reduce传过来的是不同的引用,一定不一样,只能用深层比较,但是比较消耗性能,所以用immutable比较
    //     if (nextProps.loginMsg === this.props.loginMsg) {
    //         return false;
    //     }
    //     return true
    // }
    handleLogin() {
        console.log('登录/注册')
    }
    render() {
        console.log('login render')
        const hProp = this.state.initialHeight ? { height: this.state.initialHeight } : {};
        return (
            <div className={style.medium}>
                <Carousel
                    className={style.my_carousel}
                    style={{height: '100%'}}
                    autoplay={true} 
                    infinite 
                    >
                    {this.state.data.map(ii => (
                        <a href="http://www.baidu.com" key={ii}>
                        <img
                            style={hProp}
                            src={`http://s2.music.126.net/style/mobile/img/index/iphone/iphone_01.jpg?2bc9875d108129c442f290acaa224905`}
                        />
                        </a>
                    ))} 
                </Carousel>
                <div className={`${style.login}`}>
                    <Button 
                        // size='small'
                        inline={true}
                        onClick={this.handleLogin.bind(this)}
                        style={{backgroundColor: 'red', color: '#fff'}}>
                        登录/注册
                    </Button>
                    <Button 
                        // size='small'
                        inline={true}
                        style={{color: 'red'}}>
                        立即体验
                    </Button>    
                </div>
            </div>
        )
    }
}