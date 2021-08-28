import React from 'react';
import InputField from "../../components/InputField";
import ToggleSwitch from "../../components/ToggleSwitch";

/**
 * @description Manage(add, edit) single item form component.
 */

export default function ToDoManageForm() {

    const handleSubmit = async (e) => {
        e.preventDefault();
    };


    return (
        <>
                            <form onSubmit={handleSubmit}>
                                <div className="cols">
                                    <div className="col">
                                        <InputField
                                            name="name"
                                            className='bordered'
                                            placeholder='Name*'
                                        />
                                    </div>
                                    <div className="col">
                                        <InputField
                                            name="description"
                                            className='bordered'
                                            placeholder='Description*'
                                        />
                                    </div>
                                </div>
                                <div className="cols">
                                    <div className="col">
                                        <InputField
                                            name="start"
                                            type='datetime-local'
                                            className='bordered'
                                            placeholder='Select start time*'
                                        />
                                    </div>
                                    <div className="col">
                                        <ToggleSwitch
                                            name="allowNotification"
                                            labelText="Allow Notification"
                                            type="checkbox"
                                        />
                                    </div>
                                </div>
                                {/* Add to do Item form -- end */}
                            </form>

        </>
    )
}
