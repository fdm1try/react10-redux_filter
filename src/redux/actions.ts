import { TItem } from '../components/Item';

export const ITEM_ADD = 'item-add';
export const ITEM_UPDATE = 'item-update';
export const ITEM_REMOVE = 'item-remove';
export const ITEM_MARK_FOR_EDIT = 'item-edit';
export const FILTER_BY_NAME = 'filter-apply';

export interface IAction<T> {
  type: string;
  payload?: T;
}

type TItemListDispatch = (action: IAction<TItem>) => void;

export const addItem = (dispatch: TItemListDispatch) => (item: TItem) => { 
  const action = {type: ITEM_ADD, payload: item };
  dispatch(action);
}

export const updateItem = (dispatch: TItemListDispatch) => (item: TItem) => { 
  const action = {type: ITEM_UPDATE, payload: item }
  dispatch(action);
}

export const removeItem = (dispatch: TItemListDispatch) => (item: TItem) => { 
  const action = { type: ITEM_REMOVE, payload: item };
  dispatch(action);
}

export const markItemForEdit = (dispatch: TItemListDispatch) => (item?: TItem) => { 
  const action = { type: ITEM_MARK_FOR_EDIT, payload: item };
  dispatch(action);
};

export const filterByName = (dispatch: (action: IAction<string>) => void) => (filter: string) => { 
  const action = { type: FILTER_BY_NAME, payload: filter };
  dispatch(action);
}