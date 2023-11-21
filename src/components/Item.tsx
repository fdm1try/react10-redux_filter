import React from 'react';
import { connect } from 'react-redux';
import { IAction, markItemForEdit, removeItem } from '../redux/actions';

export type TItem = {
  id: number;
  name: string;
  price: number;
}

export interface IItem {
  item: TItem;
  markItemForEdit?: (item: TItem) => void;
  removeItem?: (item: TItem) => void;
  editMode?: boolean;
}

export const Item: React.FC<IItem> = (props) => {

  function handleEditClick() {
    props.markItemForEdit && props.markItemForEdit(props.item);
  }

  function handleRemoveClick() {
    props.removeItem && props.removeItem(props.item);
  }

  return (
    <div className='item'>
      <div className='item__name'>{props.item.name}</div>
      <div className='item__price'>{props.item.price}</div>
      <button onClick={handleEditClick} className='item__edit' disabled={props.editMode}>✎</button>
      <button onClick={handleRemoveClick} className='item__remove'>✖</button>
    </div>
  )
}

type TDispatch = (action: IAction<TItem>) => void;

const mapDispatchToProps = (dispatch: TDispatch) => {
  return {
    markItemForEdit: markItemForEdit(dispatch),
    removeItem: removeItem(dispatch)
  }
}

export default connect(null, mapDispatchToProps)(Item);
