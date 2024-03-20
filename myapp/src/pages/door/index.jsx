import React, { useEffect, useState } from 'react'
import './index.css'
import { Space, Table, Tag } from 'antd';
import axios from '../../utils/index'
import { Resizable } from 'react-resizable'

const columns = [
    {
        title: "编号",
        dataIndex: "key",
        width: 300,
        ellipsis: true,
    },
    {
        title: '部门',
        dataIndex: 'title',
        // width: 60,
        ellipsis: true,

    },

];
// 可伸缩表头组件，放到组件外
const ResizableTitle = ({ onResize, width, ...restProps }) => {
    if (!width) { return (<th {...restProps} />) };

    return (
        <Resizable
            width={width}
            height={0}
            handle={
                <span
                    className="react-resizable-handle"
                    onClick={e => { e.stopPropagation() }}
                />
            }
            onResize={onResize}
            draggableOpts={{ enableUserSelectHack: false }}
        >
            <th {...restProps} style={{ ...restProps?.style, userSelect: 'none' }} />
        </Resizable>
    );
};

export default function Door() {
    const [dept, setDept] = useState([])
    const [column, setColumn] = useState(
        columns.map(it => {
            it.ellipsis = {
                showTitle: true
            }
            it.onHeaderCell = col => ({
                width: col.width,
                // !传入newColumn，而不传入column是因为需要拿到有onHeaderCell的值，外面collumn的变化内部监听不到
                onResize: (e, { size }) => handleResize(col, size),
            })
            return it;
        }
        )
    );
    // table的th实时宽度拖拽的改变
    const handleResize = (col, size) => {
        setColumn(column.map(item => {
            // 如果这个判断对不上，列宽可以移动但是会引起错乱
            if (item.dataIndex === col.dataIndex) {
                item.width = size.width;
            }
            return item
        }))
    }

    const getDept = async () => {
        const { data } = await axios.get(`dept`)
        setDept(data.data)
    }
    useEffect(() => {
        getDept()

    }, [])
    return (
        <div className='slide-in-left'>

            <Table
                bordered
                columns={columns}
                dataSource={dept}
                pagination={{ pageSize: 5 }}
                components={{
                    header: {
                        cell: ResizableTitle,
                    },
                }}
            />



        </div>
    )
}
