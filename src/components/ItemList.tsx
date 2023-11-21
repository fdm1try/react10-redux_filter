import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Item, { TItem } from './Item';
import { IState, IFilterState } from '../redux/reducers';

export type TItemList = Array<TItem>;

export interface IItemList {
  items: TItemList;
  itemToEdit?: TItem;
  filter?: IFilterState;
}

export const ItemList: React.FC<IItemList> = (props) => {
  const [items, setItems] = useState<TItemList>(props.items);

  const filterItems = () => {
    let itemList = props.items;
    if (props.filter && props.filter.name && props.filter.name.length) {
      const escapeString = props.filter.name.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
      const re = new RegExp(escapeString, 'gi');
      itemList = itemList.filter(item => re.test(item.name));
    }
    setItems(itemList);
  }

  useEffect(filterItems, [props.items, props.filter]);

  return (
    <div className='items'>
      {
        items.map((item) => (
          <Item key={item.id} item={item} editMode={props.itemToEdit === item} />
        ))
      }
    </div>
  )
}

const mapStateToProps = (state: IState) => ({ itemToEdit: state.itemList.itemToEdit, filter: state.filter });

export default connect(mapStateToProps)(ItemList);