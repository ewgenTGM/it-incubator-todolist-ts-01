import React, { useState } from 'react';
import styles from './EditableSpan.module.css';

type EditableSpanPropType = {
  initialText: string
  callback: ( text: string ) => void
}

export const EditableSpan: React.VFC<EditableSpanPropType> = ( props ) => {

  const [ editMode, setEditMode ] = useState<boolean>( false );
  const [ text, setText ] = useState<string>( props.initialText );
  const [ oldText, setOldText ] = useState<string>( props.initialText );

  const setEditModeOn = () => {
    setEditMode( true );
    setOldText( text );
  };

  const setEditModeOff = () => {
    setEditMode( false );
    props.callback( text );
  };

  const restoreOldValue = () => setText( oldText );

  return (

      editMode
          ? <input
              autoFocus
              className={ styles.input }
              type={ 'text' }
              value={ text }
              onBlur={ () => setEditModeOff() }
              onKeyPress={ e => {
                if ( e.key === 'Enter' )
                  setEditModeOff();
              } }
              onKeyUp={ e => {
                if ( e.key === 'Escape' ) {
                  setEditModeOff();
                  restoreOldValue();
                }
              } }
              onChange={ e => setText( e.currentTarget.value ) }/>
          : <span
              className={ styles.editable_span }
              onDoubleClick={ setEditModeOn }>{ text }</span>


  );
};
