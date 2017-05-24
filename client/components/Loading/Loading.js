import React from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import style from './index.scss';
export default (props) => {
    const { loading_content } = props;
    return (
        <CSSTransitionGroup
            transitionName="example"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}
            transitionAppear={true}
            transitionAppearTimeout={500}>
            <div className={style.login_container}> 
                <div className={style.sk_fading_circle}>
                    <div className={`${style.sk_circle}`}></div>
                    <div className={`${style.sk_circle} ${style.sk_circle2}`}></div>
                    <div className={`${style.sk_circle} ${style.sk_circle3}`}></div>
                    <div className={`${style.sk_circle} ${style.sk_circle4}`}></div>
                    <div className={`${style.sk_circle} ${style.sk_circle5}`}></div>
                    <div className={`${style.sk_circle} ${style.sk_circle6}`}></div>
                    <div className={`${style.sk_circle} ${style.sk_circle7}`}></div>
                    <div className={`${style.sk_circle} ${style.sk_circle8}`}></div>
                    <div className={`${style.sk_circle} ${style.sk_circle9}`}></div>
                    <div className={`${style.sk_circle} ${style.sk_circle10}`}></div>
                    <div className={`${style.sk_circle} ${style.sk_circle11}`}></div>
                    <div className={`${style.sk_circle} ${style.sk_circle12}`}></div>
                </div>
                <div>{loading_content}</div>
            </div>
        </CSSTransitionGroup>
    )
}