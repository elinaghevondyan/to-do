import React, {useEffect, useState} from 'react';
import Button from "../../components/Button";
import Icon from "../../components/Icon";
import ToDoManageForm from "./ToDoManageForm";
import {request} from "../../services/network/requests";
import {formatDate} from "../../services/util/common";

/**
 * @description Manage(add, edit) to do single item component.
 */

export default function ManageToDoSingle({modalOpen, setModalOpen, setUpdateToDoList, markEdit, setMarkEdit, selectedToDoItem, setSelectedToDoItem}) {
    let addToDoRequestUrl = `toDoList`;
    const [singleToDoData, setSingleToDoData] = useState({});
    const initialValues = {
        name: '',
        description: '',
        starting_at: null,
        allow_notification: false,
    };
    const [toDoFormData, setToDoFormData] = useState(singleToDoData?.response || initialValues);
    const [manageToDoAction, setManageToDoAction] = useState({
        response: null,
        error: false,
        loading: false,
    });
    let manageToDoDataRequestUrl = `toDoList/${selectedToDoItem}`;

    function closeModal() {
        setModalOpen(false);
        setMarkEdit(false);
        setSelectedToDoItem(null)

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const requestOptions = {
            method: !markEdit ? 'POST' : "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: !markEdit ?
                JSON.stringify({
                    name:  toDoFormData.name,
                    description: toDoFormData.description,
                    starting_at: toDoFormData.starting_at,
                    allow_notification: toDoFormData.allow_notification,
                    created: formatDate(new Date())
                }) : JSON.stringify({
                        name:  toDoFormData.name,
                        description: toDoFormData.description,
                        starting_at: toDoFormData.starting_at,
                        allow_notification: toDoFormData.allow_notification
                    }
                )
        };
        if(markEdit) {
            await request(manageToDoDataRequestUrl, requestOptions, setManageToDoAction);
        } else {
            await request(addToDoRequestUrl, requestOptions, setManageToDoAction);
        }
        setUpdateToDoList(true);
        setModalOpen(false)
    };

    const getToDoItemData = () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
        request(manageToDoDataRequestUrl, requestOptions, setSingleToDoData);
    };


    useEffect( () => {
        if(markEdit && selectedToDoItem) {
            getToDoItemData();
        }
    }, [markEdit]);

    useEffect( () => {
        if(setToDoFormData) {
            setToDoFormData(
                singleToDoData?.response
            )
        }
    }, [singleToDoData?.response]);

    return (
        <>
            <div className={`modal  ${modalOpen ? 'show' : ''}`} >
                <div className="modal-overlay">
                    <div className="modal-content card shadow mt-10">
                        <div className="card-header flex align-center justify-between">
                            <h3 className="modal-title">
                                {
                                    !markEdit ? "Add To Do Items" : "Edit To Do Items"
                                }
                            </h3>
                            <Button
                                className="btn-icon"
                                onClick={closeModal}
                            >
                                <Icon name="clear"/>
                            </Button>
                        </div>
                        {/* Add to do form -- start */}
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <ToDoManageForm
                                    setToDoFormData={setToDoFormData}
                                    toDoFormData={toDoFormData}
                                />
                            </form>
                        </div>
                        <div className="card-footer">
                            <Button
                                type="submit"
                                className="filled w-sm primary mr-3"
                                onClick={handleSubmit}
                            >
                                {
                                    !markEdit ? "Add" : "Edit"
                                }
                            </Button>
                            <Button
                                className="filled w-sm tertiary"
                                onClick={closeModal}
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
