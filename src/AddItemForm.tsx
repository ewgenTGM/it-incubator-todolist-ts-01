import React, { useState } from 'react';
import styles from './AddItemForm.module.css';


type AddItemFormType = {
  onSubmit: ( text: string ) => void
  inputPlaceholder?: string
  buttonLabel: string
}

export const AddItemForm: React.VFC<AddItemFormType> = ( props ) => {

  const [ text, setText ] = useState<string>( '' );
  const [ error, setError ] = useState<string | null>( null );

  const addTask = () => {
    if ( text.trim() ) {
      props.onSubmit( text );
      setText( '' );
      setError( null );
    } else {
      setError( 'Empty text not allowed...' );
      setText( '' );
    }
  };

  return (
      <div className={ styles.add_item_form }>
        <input
            type="text"
            className={ styles.task_input }
            placeholder={ props.inputPlaceholder && props.inputPlaceholder }
            value={ text }
            onChange={ e => {
              setText( e.currentTarget.value );
              setError( null );
            } }
            onKeyPress={ e => {
              if ( e.key === 'Enter' )
                addTask();
            } }
            onBlur={ () => setError( null ) }/>
        <button
            className={ styles.add_item_btn }
            onClick={ addTask }>
          { props.buttonLabel }
        </button>
        <div>
          { error && <span className={ styles.error }>{ error }</span> }
        </div>
      </div>
  );
};
