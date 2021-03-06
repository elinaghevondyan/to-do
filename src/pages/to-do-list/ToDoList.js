import React, {useEffect, useState} from 'react';
import Button from "../../components/Button";
import Icon from "../../components/Icon";
import {request} from "../../services/network/requests";
import ToDoSingleManage from "./ToDoSingleManage";
import {formatDate,setDateSecondsToZero} from "../../services/util/common";
import ShowToDoList from "./ShowToDoList";

/**
 * @description To Do items list.
 */

export default function ToDoList() {
    const [toDoListData, setToDoListData] = useState({
        response: null,
        error: false,
        loading: false,
    });
    const [deleteToDoItem, setDeleteToDoItem] = useState({
        response: null,
        error: false,
        success: null,
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
    const [upcomingToDoList, setUpcomingToDoList] = useState([]);

    const manageToaster = () => {
        const intervalMinute = 60000;
        const interval = setInterval(() => {
            let earlyDate = new Date();
            let currentDate = new Date();
            let durationInMinutes = 30;

            earlyDate.setMinutes(currentDate.getMinutes() - durationInMinutes);
            let formatedEarlyDate = setDateSecondsToZero(earlyDate);
            let arr = [];
            toDoListData?.response?.forEach(function(element){
                if((setDateSecondsToZero(element.starting_at) === setDateSecondsToZero(new Date()) || setDateSecondsToZero(element.starting_at) === formatedEarlyDate) && element.allow_notification) {
                    arr.push(element);
                }
            });
            setUpcomingToDoList([...upcomingToDoList, ...arr]);
        }, intervalMinute);

        return () => clearInterval(interval);
    }

    useEffect(() => {
       manageToaster();
        }, [toDoListData?.response, upcomingToDoList]);

        const init = () => {
            request(requestUrl, requestOptions, setToDoListData);
            if(updateToDoList) {
                setUpdateToDoList(false)
            }
            if(deleteToDoItem.success) {
                setDeleteToDoItem({
                        success: null,
                    }
                )
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

        const handleDelete = async (id) => {
            const requestOptions = {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            };
            let deleteRequestUrl = `toDoList/${id}`;

            await request(deleteRequestUrl, requestOptions, setDeleteToDoItem);
        };

        useEffect( () => {init()}, [updateToDoList, deleteToDoItem.success]);



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
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Start</th>
                                    <th>Notification</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {toDoListData?.response?.loading && <tr>
                                    <td colSpan={6}>
                                        <p className="text-center">Loading ...</p>
                                    </td>
                                </tr>
                                }
                                {toDoListData?.response?.length === 0 ? <tr>
                                        <td colSpan={6}>
                                            <p className="text-center">No data to show</p>
                                        </td>
                                    </tr> :
                                    toDoListData?.response?.map((data) => {
                                        return (
                                            <tr key={data.id}>
                                                <td>{data.id}</td>
                                                <td>{data.name}</td>
                                                <td>{data.description}</td>
                                                <td>{formatDate(data.starting_at)}</td>
                                                <td>{data.allow_notification ? "Yes" : "No"}</td>
                                                <td>
                                                    <ul className="actions">
                                                        <li>
                                                            <Button className="btn-icon"
                                                                onClick={() => handleEdit(data.id)}
                                                            >
                                                                <Icon name="edit"
                                                                    className="color-secondary fs-md"
                                                                />
                                                            </Button>
                                                        </li>
                                                        <li>
                                                            <Button className="btn-icon"
                                                                onClick={() => handleDelete(data.id)}
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
                        setSelectedToDoItem={setSelectedToDoItem}
                    />
                }
             <ShowToDoList
                 upcomingToDoList={upcomingToDoList}
                 setUpcomingToDoList={setUpcomingToDoList}
             />
            </>
        )
    }
