import React from 'react';
import Button from "../../components/Button";
import Icon from "../../components/Icon";
import ToDoManageForm from "./ToDoManageForm";

/**
 * @description Manage(add, edit) to do single item component.
 */

export default function ManageToDoSingle({modalOpen, setModalOpen}) {

    function closeModal() {
        setModalOpen(false);
    }

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
                             <ToDoManageForm/>
                          </div>
                          <div className="card-footer">
                              <Button
                                  type="submit"
                                  className="filled w-sm primary mr-3"
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
