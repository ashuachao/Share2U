import React from 'react';
import Bundle from 'components/Bundle/Bundle';
import loadNoMatch from 'bundle-loader?lazy!containers/NoMatch/NoMatch';
import loadCommentApp from 'bundle-loader?lazy!containers/Comment/CommentApp';
import loadLogin from 'bundle-loader?lazy!containers/Login/Login';
export const NoMatch = () => (
    <Bundle load={(loadNoMatch)}>
        {(Comp) => Comp
            ? <Comp/>
            : null
        }
    </Bundle>
)
export const CommentApp = () => (
    <Bundle load={(loadCommentApp)}>
        {(Comp) => Comp
            ? <Comp/>
            : null
        }
    </Bundle>
)
export const Login = () => (
    <Bundle load={(loadLogin)}>
        {(Comp) => Comp
            ? <Comp/>
            : null
        }
    </Bundle>
)