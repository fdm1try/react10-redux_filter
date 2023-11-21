import { FC, useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import ItemList, { TItemList } from './ItemList';
import { TItem } from './Item';
import { IState } from '../redux/reducers';
import { IAction, updateItem, addItem, markItemForEdit, filterByName } from '../redux/actions';

export interface IItemListEditor {
  items: TItemList;
  itemToEdit?: TItem;
  addItem?: (item: TItem) => void;
  updateItem?: (item: TItem) => void;
  markItemForEdit?: (item?: TItem) => void;
  filterByName?: (filter: string) => void;
}

export const ItemListEditor: FC<IItemListEditor> = (props) => {
  const [nameValue, setNameValue] = useState<string>('');
  const [priceValue, setPriceValue] = useState<string>('');
  const [filterByName, setFilterByName] = useState<string>('');
  const prevItemToEditProp = useRef<TItem>();
  const inputName = useRef<HTMLInputElement>(null);
  const inputPrice = useRef<HTMLInputElement>(null);
  const inputFilterByNameTimeout = useRef<number>();


  useEffect( () => {
    if (prevItemToEditProp.current !== props.itemToEdit) {
      setNameValue(props.itemToEdit?.name || '');
      setPriceValue(`${props.itemToEdit?.price}` || '');
    }
    prevItemToEditProp.current = props.itemToEdit;
  }, [props.itemToEdit]);

  function resetForm() {
    setNameValue('');
    setPriceValue('');
  }

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNameValue(e.target.value);
  }

  function handlePriceChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPriceValue(e.target.value);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const name = inputName.current?.value || '';
    const price = +(inputPrice.current?.value || 0);
    if (props.itemToEdit) {
      const { id } = props.itemToEdit;      
      props.updateItem && props.updateItem({id, name, price});
      props.markItemForEdit && props.markItemForEdit();
      return;
    }
    props.addItem && props.addItem({id: -1, name, price});
    resetForm();
    inputName.current?.focus();
  }

  function handleCancelClick() {
    if (props.itemToEdit) {
      props.markItemForEdit && props.markItemForEdit();
    }
    resetForm();
    inputName.current?.focus();
  }

  function applyFilterByName(filter: string = '') {
    if (inputFilterByNameTimeout.current) clearTimeout(inputFilterByNameTimeout.current);
    props.filterByName && props.filterByName(filter);
  }

  function handleFilterByNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    const  { value } = e.target;
    setFilterByName(value);
    if (inputFilterByNameTimeout.current) clearTimeout(inputFilterByNameTimeout.current);
    if (e.target.value.length > 1) {      
      inputFilterByNameTimeout.current = setTimeout(() => applyFilterByName(e.target.value), 500);
    } else {
      applyFilterByName();
    }
  }

  return (
    <div className='editor'>
      <div className='editor__header'>
        <form className='editor__form' onSubmit={handleSubmit}>
          <input placeholder='Наименование' ref={inputName} onChange={handleNameChange} 
            className='editor__form_name' required type='text' name='name' value={nameValue} 
          />
          <input placeholder='Стоимость' ref={inputPrice} onChange={handlePriceChange} 
            className='editor__form_price' required type='number' name='price' value={priceValue} 
          />
          <button className='editor__form_submit'>Save</button>
          <button className='editor__form_reset' onClick={handleCancelClick} type='button'>Cancel</button>
        </form>
        {
          props.items?.length > 0 && (
            <input placeholder='Фильтр по наименованию' onChange={handleFilterByNameChange} 
              className='editor__filter-name' type='text' value={filterByName} 
            />
          )
        }
      </div>
      <div className='editor__body'>
        <ItemList items={props.items} />
      </div>
    </div>
  )
}

const mapStateToProps = (state: IState) => ({ 
  itemToEdit: state.itemList.itemToEdit, 
  items: state.itemList.items,
});

type TDispatch = (action: IAction<TItem|string>) => void;

const mapDispatchToProps = (dispatch: TDispatch) => ({
  addItem: addItem(dispatch),
  updateItem: updateItem(dispatch),
  markItemForEdit: markItemForEdit(dispatch),
  filterByName: filterByName(dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemListEditor);