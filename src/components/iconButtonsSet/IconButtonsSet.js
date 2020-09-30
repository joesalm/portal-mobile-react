import React, { Component } from 'react';
import './IconButtonsSet.css'
import back_arrow from '../../assets/images/back_arrow.png'
import icon_copy from '../../assets/images/icon_copy.png'
import icon_save from '../../assets/images/icon_save.png'
import icon_delete from '../../assets/images/icon_delete.png'
import disabled_save from '../../assets/images/disabled_save.png'
import disabled_back_arrow from '../../assets/images/disabled_back_arrow.png'
import disabled_copy from '../../assets/images/disabled_copy.png'
import disabled_delete from '../../assets/images/disabled_delete.png'
import addButtonOn from '../../assets/images/addButtonOn.png'
import addButtonOff from '../../assets/images/addButtonOff.png'




class IconButtonsSet extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }


    render() {
        const { onCopy, onSave, onDelete, onBack, onAdd } = this.props

        const addButtonUi = onAdd
            ? <img type="button" onClick={() => onAdd()} className="addButton" src={addButtonOn} />
            : <img type="button" className="addButton" src={addButtonOff} />

        const saveIconUi = onSave
            ? <img type="button" onClick={() => onSave()} className="iconImg" src={icon_save} />
            : <img type="button" className="iconImg" src={disabled_save} />

        const copyIconUi = onCopy
            ? <img type="button" onClick={() => onCopy()} className="iconImg" src={icon_copy} />
            : <img type="button" className="iconImg" src={disabled_copy} />

        const deleteIconUi = onDelete
            ? <img type="button" onClick={() => onDelete()} className="iconImg" src={icon_delete} />
            : <img type="button" className="iconImg" src={disabled_delete} />

        const backIconUi = onBack
            ? <img type="button" onClick={() => onBack()} className="iconImg" src={back_arrow} />
            : <img type="button" className="iconImg" src={disabled_back_arrow} />


        return (
            <div className="c-iconButtonsSet">
                {saveIconUi}
                {copyIconUi}
                {addButtonUi}
                {deleteIconUi}
                {backIconUi}
            </div>
        );
    }
}

export default IconButtonsSet;