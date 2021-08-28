import React, {useEffect, useState} from 'react';
import Button from "../../components/Button";
import Icon from "../../components/Icon";
import ToDoManageForm from "./ToDoManageForm";
import {request} from "../../services/network/requests";

/**
 * @description Manage(add, edit) to do single item component.
 */

export default function ManageToDoSingle({modalOpen, setModalOpen, setUpdateToDoList}) {
    const initialData = {
        name: '',
        description: '',
        starting_at: null,
        allow_notification: false,
    };
    let addToDoRequestUrl = `toDoList`;
    const [toDoFormData, setToDoFormData] = useState(initialData);
    const [manageToDoAction, setManageToDoAction] = useState({
        response: null,
        error: false,
        loading: false,
    });

    function closeModal() {
        setModalOpen(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name:  toDoFormData.name,
                description: toDoFormData.description,
                starting_at: toDoFormData.starting_at,
                allow_notification: toDoFormData.allow_notification
                }
            )
        };
        await request(addToDoRequestUrl, requestOptions, setManageToDoAction);
        setUpdateToDoList(true);
        setModalOpen(false)
    };

    return (
        <>
            <div className={`modal  ${modalOpen ? 'show' : ''}`} >
                <div className="modal-overlay">
                    <div className="modal-content card shadow mt-10">
                        <div className="card-header flex align-center justify-between">
                            <h3 className="modal-title">
                                Add To Do Items
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
                                Add
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
