import React, { CSSProperties, useCallback, useState } from 'react';
import { Box, Button, TextField } from '@material-ui/core';


export type AddItemFormPropsType = {
  onSubmit: ( text: string ) => void
  inputPlaceholder?: string
  buttonLabel?: string
  defaultWidth?: string
  backgroundStyle?: CSSProperties
}

export const AddItemForm: React.VFC<AddItemFormPropsType> = React.memo( props => {
  const {
    onSubmit,
    inputPlaceholder,
    buttonLabel,
    defaultWidth,
    backgroundStyle
  } = props;

  console.log( 'Отрисовка AddItemForm placeholder', inputPlaceholder );

  const [ text, setText ] = useState<string>( '' );
  const [ error, setError ] = useState<string | null>( null );

  const style: CSSProperties = {
    fontWeight: 'bold'
  };

  const addItem = useCallback( () => {
    if ( text.trim() ) {
      onSubmit( text );
      setText( '' );
      setError( null );
    } else {
      setError( 'Empty text not allowed...' );
      setText( '' );
    }
  }, [ text, onSubmit ] );

  return (
      <Box
          paddingTop={ 3 }
          paddingBottom={ 3 }
          display={ 'flex' }
          flexDirection={ 'column' }
          alignItems={ 'center' }
          justifyContent={ 'center' }
          style={ { maxWidth: defaultWidth, boxSizing: 'border-box' } }>
        <TextField
            style={ style }
            variant={ 'outlined' }
            size={ 'small' }
            type={ text }
            error={ !!error }
            label={ inputPlaceholder }
            helperText={ error }
            value={ text }
            onChange={ e => {
              setText( e.currentTarget.value );
              setError( null );
            } }
            onKeyPress={ e => {
              if ( e.key === 'Enter' )
                addItem();
            } }
            onBlur={ () => setError( null ) }
        />
        <Button
            style={ { marginTop: '10px' } }
            variant={ 'contained' }
            size={ 'small' }
            onClick={ addItem }>
          { buttonLabel ? buttonLabel : 'ADD' }
        </Button>
      </Box>
  );
} );
