import { Action, createReducer, on } from '@ngrx/store';
import { Todo } from './models/todo.model';
import {
  borrarCompletados,
  crear,
  editar,
  eliminar,
  toggle,
  toggleAll,
} from './todo.actions';

export const initialState: Todo[] = [
  new Todo('Salvar el mundo'),
  new Todo('Vencer a Thanos'),
  new Todo('Robar el escudo del cap'),
];

const _todoReducer = createReducer(
  initialState,
  on(crear, (state, { texto }) => [...state, new Todo(texto)]),
  on(toggle, (state, { id }) => {
    return state.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completado: !todo.completado,
        };
      } else {
        return todo;
      }
    });
  }),
  on(toggleAll, (state, { completado }) => {
    return state.map((todo) => {
      return {
        ...todo,
        completado: completado,
      };
    });
  }),
  on(editar, (state, { id, texto }) => {
    return state.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          texto: texto,
        };
      } else {
        return todo;
      }
    });
  }),
  on(eliminar, (state, { id }) => state.filter((todo) => todo.id !== id)),
  on(borrarCompletados, (state) => state.filter((todo) => !todo.completado))
);

export function todoReducer(state: Todo[] = initialState, action: Action) {
  return _todoReducer(state, action);
}
