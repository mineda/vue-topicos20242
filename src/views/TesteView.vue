<template>
    <div>
        <form @submit.prevent="novo">
            <p><input type='text' v-model='produto.nome' required/></p>
            <p><input type='text' v-model='produto.descricao'/></p>
            <p><input type='date' v-model='produto.dataCadastro'/></p>
            <p><input type='datetime-local' v-model='produto.dataHoraUltimaCompra' required/></p>
            <p><input type='number' v-model='produto.lote'/></p>
            <button type="submit">Incluir</button>
        </form>
        <p v-if='erro'>{{ erro }}</p>
        <table>
            <thead>
                <th>Id</th>
                <th>Nome</th>
                <th>Data/hora última compra</th>
            </thead>
            <tbody>
                <tr v-for='(prod, index) in produtos' :key='index'>
                    <td>{{ prod.id }}</td>
                    <td>{{ prod.nome }}</td>
                    <td>{{ prod.dataHoraUltimaCompra }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { onMounted } from 'vue';
import axios from 'axios';

interface Produto {
  id?: Number;
  nome: String;
  descricao?: String;
  dataCadastro?: Date;
  dataHoraUltimaCompra: Date;
  lote?: Number;
}

const produto = ref<Produto>({ nome: '', dataHoraUltimaCompra: new Date()});

const produtos = ref<Produto[]>();
    
const erro = ref<String>();

async function todosProdutos() {
    try {
        produtos.value = ( await axios.get('produto')).data;
        erro.value = '';
    }
    catch(ex) {
        erro.value = (ex as Error).message;
    }
}

async function novo() {
    try {
        await axios.post('produto', produto.value);
        todosProdutos();
        erro.value = ''; 
    }
    catch(ex) {
        erro.value = (ex as Error).message;
    }
    
}

onMounted(() => {
    todosProdutos();
});

</script>