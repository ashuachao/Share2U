import React from 'react';
import Bundle from 'components/Bundle/Bundle';
import loadNoMatch from 'bundle-loader?lazy!containers/NoMatch/NoMatch';
import loadCommentApp from 'bundle-loader?lazy!containers/Comment/CommentApp';
import loadLogin from 'bundle-loader?lazy!containers/Login/Login';
import loaderUploader from 'bundle-loader?lazy!containers/Uploader/Uploader';
import CommentApp from 'containers/Comment/CommentApp';
import Home from 'containers/Home/Home';
export { CommentApp, Home }
export const NoMatch = () => (
    <Bundle load={(loadNoMatch)}>
        {(Comp) => Comp
            ? <Comp/>
            : null
        }
    </Bundle>
)
// export const CommentApp = () => (
//     <Bundle load={(loadCommentApp)}>
//         {(Comp) => Comp
//             ? <Comp/>
//             : null
//         }
//     </Bundle>
// )
export const Login = () => (
    <Bundle load={(loadLogin)}>
        {(Comp) => Comp
            ? <Comp/>
            : null
        }
    </Bundle>
)
export const Uploader = () => (
    <Bundle load={(loaderUploader)}>
        {(Comp) => Comp
            ? <Comp/>
            : null
        }
    </Bundle>
)