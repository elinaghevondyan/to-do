import React, {useEffect, useState} from 'react';
import Button from "../../components/Button";
import Icon from "../../components/Icon";
import {request} from "../../services/network/requests";
import {formatDate} from "../../services/util/common";
import ToDoSingleManage from "./ToDoSingleManage";

/**
 * @description To Do items list.
 */

export default function ToDoList() {
    const [toDoListData, setToDoListData] = useState({
        response: null,
        error: false,
        loading: false,
    });
    let requestUrl = 'toDoList';
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };
    const [modalOpen, setModalOpen] = useState(false);
    const [markEdit, setMarkEdit] = useState(false);
    const [updateToDoList, setUpdateToDoList] = useState(false);
    const [selectedToDoItem, setSelectedToDoItem] = useState(false);

    const init = () => {
        request(requestUrl, requestOptions, setToDoListData);
        if(updateToDoList) {
            setUpdateToDoList(false)
        }
    };

    function openModal() {
        setModalOpen(true);
    }

    const handleEdit = async  (id) => {
        setMarkEdit(true);
        await setSelectedToDoItem(id);
        openModal();
    };


    useEffect( () => {init()}, [updateToDoList]);

    return (
        <>
            <div className="main-content">
                <div className="container">
                    <h3 className="title mb-5">To Do List</h3>
                    <div className="flex justify-end mb-5">
                        <Button
                            className="filled primary"
                            onClick={openModal}
                        >
                            Add To Do
                        </Button>
                    </div>
                    {/* To Do table -- start */}
                    <div className="table-main white">
                        <table>
                            <thead>
                            <tr>
                                <th>
                                    Id
                                </th>
                                <th>
                                    Name
                                </th>
                                <th>
                                    Description
                                </th>
                                <th>
                                    Start
                                </th>
                                <th>
                                    Notification
                                </th>
                                <th>
                                    Actions
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {toDoListData?.loading && <tr>
                                <td colSpan={6}>
                                    <p className="text-center">Loading ...</p>
                                </td>
                            </tr>
                            }
                            {toDoListData?.response?.length === 0 || !toDoListData?.response ? <tr>
                                    <td colSpan={6}>
                                        <p className="text-center">No data to show</p>
                                    </td>
                                </tr> :
                                toDoListData?.response?.map((data) => {
                                    return (
                                        <tr key={data.id}>
                                            <td>
                                                {data.id}
                                            </td>
                                            <td>
                                                {data.name}
                                            </td>
                                            <td>
                                                {data.description}
                                            </td>
                                            <td>
                                                {data.starting_at}
                                            </td>
                                            <td>
                                                {data.allow_notification ? "Yes" : "No"}
                                            </td>
                                            <td>
                                                <ul className="actions">
                                                    <li>
                                                        <Button
                                                            className="btn-icon"
                                                            onClick={() => handleEdit(data.id)}
                                                        >
                                                            <Icon
                                                                name="edit"
                                                                className="color-secondary fs-md"
                                                            />
                                                        </Button>
                                                    </li>
                                                    <li>
                                                        <Button
                                                            className="btn-icon"
                                                        >
                                                            <Icon
                                                                name="clear"
                                                                className="color-warning fs-md"
                                                            />
                                                        </Button>
                                                    </li>
                                                </ul>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    {/* To Do table -- end */}
                </div>
            </div>
            {
                modalOpen &&
                <ToDoSingleManage
                    modalOpen={modalOpen}
                    setModalOpen={setModalOpen}
                    setUpdateToDoList={setUpdateToDoList}
                    markEdit={markEdit}
                    setMarkEdit={setMarkEdit}
                    selectedToDoItem={selectedToDoItem}
                />
            }

        </>
    )
}
