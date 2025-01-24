import { Button, TextField } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { sendThisToDatabase } from '@services/sendData';
import CustomSelect_Widget from '~/components/customSelect_widget';
import color from '~/config/colors';

type Props = {};

const retorno = (props: Props) => {
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm();

  const [disabilitarBotao, setDisabilitarBotao] = React.useState(false);

  async function onSubmit(e: any) {
    setDisabilitarBotao(true);

    const dadosFeedBack = {
      nome: e.nome,
      avalie: e.avalie,
      nota: e.nota,
      gravidade: e.gravidade,
      pontos: e.pontos,
      gostaria: e.gostaria,
      obs: e.obs,
      setor: 'feedBack',
    };
    await sendThisToDatabase('/api/methodsdatabase/create', dadosFeedBack, 300);

    window.location.reload();
  }

  return (
    <div>
      <img src="/logoce (2).svg" style={{ width: 70, marginLeft: 15, marginTop: 15 }} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          marginTop: 0,
        }}
      >
        <h3 style={{ textAlign: 'center', marginBottom: 50, marginTop: 0, marginRight: 32, }}>Formulário de FeedBack</h3>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: 600 }}>
          <div style={{ flex: 1, marginRight: 10 }}>
            <TextField
              {...register('nome')}
              sx={{ width: 250 }}
              type="text"
              id="nome"
              label="Preencha seu nome ou deixe anônimo!"
              variant="outlined"
            />
            <br /><br/><br/>
            <TextField
              {...register('nota')}
              sx={{ width: 250 }}
              type="text"
              id="nota"
              label="Por que esta avaliação?"
              variant="outlined"
            />
            <br /><br/><br/>
            <TextField
              {...register('gostaria')}
              sx={{ width: 250 }}
              type="text"
              id="gostaria"
              label="O que você gostaria de ver no sistema?"
              variant="outlined"
            />
            <br /><br/><br/>

            
          </div>
          <div style={{ flex: 1, marginLeft: 10 }}>
            <CustomSelect_Widget
              labelText={'Escolha uma nota:'}
              register={register('avalie', { required: true })}
              itens={[
                { value: '1', visualValue: '1', color: color.feedback.um.background },
                { value: '2', visualValue: '2', color: color.feedback.dois.background },
                { value: '3', visualValue: '3', color: color.feedback.tres.background },
                { value: '4', visualValue: '4', color: color.feedback.quatro.background },
                { value: '5', visualValue: '5', color: color.feedback.cinco.background },
                { value: '6', visualValue: '6', color: color.feedback.seis.background },
                { value: '7', visualValue: '7', color: color.feedback.sete.background },
                { value: '8', visualValue: '8', color: color.feedback.oito.background },
                { value: '9', visualValue: '9', color: color.feedback.nove.background },
                { value: '10', visualValue: '10', color: color.feedback.dez.background },
              ]}
              
            />
            <br /><br/><br/>
            
            <TextField
              {...register('pontos')}
              sx={{ width: 250 }}
              type="text"
              id="pontos"
              label="Pontos que poderiam melhorar:"
              variant="outlined"
            />
            <br /><br/>
            
          </div>
        </div>
        <div style={{ width: 500, alignSelf: 'center', marginRight:30, marginTop: 20 }}>
          <TextField
            {...register('obs')}
            sx={{ width: 500 }}
            type="text"
            id="obs"
            label="Observações"
            variant="outlined"
          />
          <br /><br/><br/>
        </div>
        <Button type="submit" disabled={disabilitarBotao} variant="contained" sx={{ marginRight: '20px' }}>
          Enviar
        </Button>
      </form>
    </div>
  );
};

export default retorno;
