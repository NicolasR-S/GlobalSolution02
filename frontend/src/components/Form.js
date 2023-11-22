import axios, { Axios } from "axios";
import React, { useEffect, useRef} from "react";
import { toast } from "react-toastify";
import styled from "styled-components";



const FormContainer = styled.form`
   display: flex;
   align-items: flex-end;
   gap: 10px;
   flex-wrap: wrap;
   background-color: #fff;
   padding: 20px;
   box-shadow: 0px 0px 5px #ccc;
   border-radius: 5px
`;

const InputArea = styled.div`
    display: flex;
    flex-direction: column;
`;

const Input = styled.input`
    width: 120px;
    padding: 0 10px;
    border: 1px solid #bbb;
    border-radius: 5px;
    height: 40px;

`;

const Label = styled.label``;

const Button = styled.button`
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
    border: none;
    background-color: #2c73d2;
    color: white;
    height: 42px;

`;

const Form = ({getUsers, onEdit, setOnEdit}) => {
    const ref = useRef();

    useEffect(() => {
        if(onEdit) {
            const user = ref.current;

            user.tipo_alimento.value = onEdit.tipo_alimento;
            user.destino.value = onEdit.destino;
            user.quantidade_kg.value = onEdit.quantidade_kg;
            user.data_emissao.value = onEdit.data_emissao;
        }
    }, [onEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = ref.current;

        if (
            !user.tipo_alimento.value ||
            !user.destino.value ||
            !user.quantidade_kg.value ||
            !user.data_emissao.value 
            
        ) {
            return toast.warn("Preencha todos os campos!")
        }

        if (onEdit) {
            await axios 
                .put("http://localhost:8800/" + onEdit.id, {
                    tipo_alimento:user.tipo_alimento.value,
                    destino: user.destino.value,
                    quantidade_kg: user.quantidade_kg.value,
                    data_emissao:user.data_emissao.value,
                })
                .then(({data}) => toast.success(data))
                .catch(({data}) => toast.error(data));



        } else {
            await axios 
                .post("http://localhost:8800", {
                    tipo_alimento:user.tipo_alimento.value,
                    destino: user.destino.value,
                    quantidade_kg: user.quantidade_kg.value,
                    data_emissao:user.data_emissao.value,
                })
                .then(({data}) => toast.success(data))
                .catch(({data}) => toast.error(data));
                
        }
        user.tipo_alimento.value = "";
        user.destino.value = "";
        user.quantidade_kg.value = "";
        user.data_emissao.value = "";
        
        setOnEdit(null);
        getUsers();
       
        
    };
    
       
    




    return (
        <FormContainer ref={ref} onSubmit={handleSubmit}>
            <InputArea>
                <label>Tipo de alimento</label>
                <Input name="tipo_alimento"/>

            </InputArea>
            <InputArea>
                <Label>Destino</Label>
                <Input name="destino" />
            </InputArea>
            <InputArea>
                <Label>Quantidade em KG</Label>
                <Input name="quantidade_kg"/>
            </InputArea>
            <InputArea>
                <Label>Data de Emissao</Label>
                <Input name="data_emissao" type="date"/>
            </InputArea>

            <Button type="subtmit">SALVAR</Button>

        </FormContainer>
    );
};

export default Form;