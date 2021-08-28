import React, {useEffect} from 'react';
import Toaster from "../../components/Toaster";

/**
 * @description List of to dos to be shown component.
 */

export default function ShowToDoList({upcomingToDoList, setUpcomingToDoList}) {

    const removeToDoToaster = (i) => {
        let updatedUpcomingList = [...upcomingToDoList.slice(0, i), ...upcomingToDoList.slice(i + 1)];
        setUpcomingToDoList(updatedUpcomingList);

    };

    return (
        <>
            <ul className="toaster-list">
                {
                    upcomingToDoList?.map((data, i) => {
                        return (
                            <li key={i}>
                                <Toaster
                                    name={data.name}
                                    description={data.description}
                                    onClick={() => removeToDoToaster(i)}
                                />
                            </li>
                        );
                    })
                }
            </ul>
        </>
    )
}
