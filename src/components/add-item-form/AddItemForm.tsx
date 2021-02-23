import React, { CSSProperties, useState } from 'react';
import { Box, Button, TextField } from '@material-ui/core';


type AddItemFormType = {
  onSubmit: ( text: string ) => void
  inputPlaceholder?: string
  buttonLabel: string
  defaultWidth?: string
  backgroundStyle?: CSSProperties
}

export const AddItemForm: React.VFC<AddItemFormType> = ( props ) => {


  const [ text, setText ] = useState<string>( '' );
  const [ error, setError ] = useState<string | null>( null );

  const style: CSSProperties = {
    fontWeight: 'bold',
    width: '100%'
  };

  const addItem = () => {
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
      <Box
          paddingTop={ 3 }
          paddingBottom={ 3 }
          display={ 'flex' }
          flexDirection={ 'column' }
          alignItems={ 'center' }
          justifyContent={ 'center' }
          style={ { width: props.defaultWidth, boxSizing: 'border-box' } }>
        <TextField
            style={ style }
            variant={ 'outlined' }
            size={ 'small' }
            type={ text }
            error={ !!error }
            label={ props.inputPlaceholder }
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
          { props.buttonLabel }
        </Button>
      </Box>
  );
};
