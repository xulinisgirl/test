import React, { useEffect, useState } from 'react'
import { DownOutlined } from '@ant-design/icons';
import { Tree, Input, TreeSelect, Button } from 'antd';
import axios from '../../utils/index';
import './index.css'

export default function List() {
    const [treeData, settreeData] = useState([])
    const [value, setValue] = useState("");
    const [title, setTitle] = useState()
    const [id, setId] = useState()

    const getTree = async () => {
        const { data } = await axios.get(`data`)
        // console.log(data);
        settreeData(data.data)


    }

    const onSelect = async (selectedKeys, info) => {
        // console.log(selectedKeys, info.node);
        // 默认文本
        setId(selectedKeys[0])
        setTitle(info.node.title)
        const { data } = await axios.get("dept", { params: { id: info.node.did } })
        setValue(data.data[0]._id);
    };
    const onChange = (newValue) => {
        setValue(newValue);
    };
    const add = async () => {
        await axios.post("add", { title, did: value })
        getTree()

    }
    const edit = async () => {
        console.log(id, title);
        await axios.put("edit", { title, id })
        getTree()

    }
    const remove = async () => {
        await axios.post("del", { id })
        getTree()
        setTitle()

    }
    useEffect(() => {
        getTree()

    }, [])

    return (
        <div className='slide-in-right'>


            <Button size="small" onClick={add}>新增</Button>
            <Button size="small" onClick={edit}>保存</Button>
            <Button size="small" onClick={remove}>删除</Button>


            <div id='right'>

                {treeData.length > 0 ? (
                    <Tree
                        defaultExpandAll={true}
                        // defaultExpandedKeys={["64e2de597b10fa8f76c1b259"]}
                        switcherIcon={<DownOutlined />}
                        onSelect={onSelect}
                        treeData={treeData}
                    />
                ) : (
                    <span></span>
                )
                }


                <div id='main'>

                    上级部门：
                    <TreeSelect
                        showSearch
                        style={{
                            width: '100%',
                        }}
                        value={value}
                        dropdownStyle={{
                            maxHeight: 400,
                            overflow: 'auto',
                        }}
                        placeholder="Please select"
                        allowClear
                        treeDefaultExpandAll
                        onChange={onChange}
                        treeData={treeData}
                    />
                    部门名称：<Input placeholder="Basic usage" value={title} onChange={(e) => { setTitle(e.target.value) }} />
                </div>
            </div>



        </div>
    )
}
