import React from 'react'
import Logoin from './logoin'
import Chat from './chat'

class Nav extends React.Component {
    constructor(props:any) {
        super(props);
        this.state = {}
    }

    render() {
        return <>
            <div className="Nav">
                <Logoin />
                <Chat />
            </div>
        </>
    }
}

export default Nav;