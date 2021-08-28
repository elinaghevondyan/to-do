import React, {useState} from 'react';
import InputField from "../../components/InputField";
import ToggleSwitch from "../../components/ToggleSwitch";
import {request} from "../../services/network/requests";

/**
 * @description Manage(add, edit) single item form component.
 */

export default function ToDoManageForm({toDoFormData, setToDoFormData}) {

    const handleChange = (e) => {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        setToDoFormData({
            ...toDoFormData,
            [name] : value,
        });
    };

        return (
            <>
                    <div className="cols">
                        <div className="col">
                            <InputField
                                name="name"
                                className='bordered'
                                placeholder='Name*'
                                value={toDoFormData?.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col">
                            <InputField
                                name="description"
                                className='bordered'
                                placeholder='Description*'
                                value={toDoFormData?.description || ''}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="cols">
                        <div className="col">
                            <InputField
                                name="starting_at"
                                type='datetime-local'
                                className='bordered'
                                placeholder='Select start time*'
                                value={toDoFormData?.starting_at || ''}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col">
                            <ToggleSwitch
                                name="allow_notification"
                                labelText="Allow Notification"
                                type="checkbox"
                                checked={toDoFormData?.allow_notification}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    {/* Add to do Item form -- end */}
            </>
        )
    }
