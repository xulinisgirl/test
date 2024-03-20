import React from 'react'
import { Tag } from 'antd';

import { useHistory } from 'umi'
export default function Home(props) {
    const history = useHistory()
    return (
        <div>
            <Tag closable onClick={() => { history.push("/home/door") }}>
                销量门户
            </Tag>
            <Tag closable onClick={() => { history.push("/home/list") }}>
                组织机构设置
            </Tag>
            <div>
                {props.children}
            </div>
        </div>
    )
}
