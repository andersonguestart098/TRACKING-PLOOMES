import React from 'react'
import { ModelFinanceiro } from "@models/setoresInterface";
import { Button } from "@mui/material";
import { createDataController } from '~/services/prisma/createData';
import { databaseRepository } from '~/repositories/mutateData';
import { getSession, signIn, signOut } from 'next-auth/react';
import { GetServerSideProps } from 'next/types';


export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const session = await getSession(ctx)

  if(session) {
    return {
      redirect: {
        destination: "/home",
        permanent: false
      }
    }
  }

  return {
    props:{
      session
    }
  }
}

function index() {

  return (
    <>
      <Button onClick={() => signIn('github')}>
        LOGIN
      </Button>
      <Button onClick={() => signOut()}>Sair</Button>
    </>
  )
}

export default index