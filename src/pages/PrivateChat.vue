<script>
import BaseButton from '../components/BaseButton.vue';
import BaseTextarea from '../components/BaseTextArea.vue';
import LoaderCircle from '../components/LoaderCircle.vue';
import { sendPrivateChatMessage, subscribeToPrivateChat } from '../services/private-chat';
import { getUserProfileById } from '../services/user';
import { subscribeToAuth } from '../services/auth';
import { dateToString } from '../helpers/date';
import MainTitle from '../components/MainTitle.vue';

export default {
    name: 'PrivateChat',
    components: { LoaderCircle, BaseTextarea, BaseButton, MainTitle },
    data() {
        return {
            userLoading: true,
            user: {
                id: null,
                email: null,
            },
            authUser: {
                id: null,
                email: null,
            },
            unsubscribeAuth: () => { },
            newMessage: {
                message: '',
            },
            messagesLoading: true,
            messages: [],
            unsubscribeMessages: () => { },
        };
    },
    methods: {
        handleSendMessage() {
            sendPrivateChatMessage({
                senderId: this.authUser.id,
                receiverId: this.user.id,
                message: this.newMessage.message
            })
        },
        formatDate(date) {
            return dateToString(date);
        }
    },


    async mounted() {
        this.userLoading = true;
        this.unsubscribeAuth = subscribeToAuth(newUser => this.authUser = newUser);
        this.user = await getUserProfileById(this.$route.params.id);
        this.userLoading = false;
        this.messagesLoading = true;
        this.unsubscribeMessages = await subscribeToPrivateChat({
            senderId: this.authUser.id,
            receiverId: this.user.id,
        },
            (newMessages) => this.messages = newMessages);
        this.messagesLoading = false;
    },
    unmounted() {
        this.unsubscribeAuth();
        this.unsubscribeMessages();
    }
}
</script>

<template>
    <LoaderCircle v-if="userLoading" />
    <template v-else>
        <MainTitle class="mb-5">Conversación con {{ user.email }}</MainTitle>

        <h2 class="sr-only">Mensajes</h2>
        <div class="flex flex-col items-start min-h-[400px] bg-[#aaaaaa] p-4 border border-gray-300 rounded mb-4">
            <LoaderCircle v-if="messagesLoading" />
            <template v-else>
                <div v-for="message in messages" :key="message.id" class="mb-2 max-w-[70%] p-2" :class="{
                    'bg-gray-100': message.senderId !== authUser.id,
                    'bg-green-200': message.senderId === authUser.id,
                    'self-end': message.senderId === authUser.id,
                }">
                    <div>{{ message.message }}</div>
                    <div class="text-right">{{ formatDate(message.created_at) || 'Sending...' }}</div>
                </div>
            </template>
        </div>

        <h2 class="sr-only">Enviar mensajes</h2>
        <form class="flex gap-2" action="#" @submit.prevent="handleSendMessage">
            <label for="message" class="sr-only">Mensaje</label>
            <BaseTextarea id="message" class="w-11/12" v-model="newMessage.message" />
            <BaseButton class="w-1/12">Enviar</BaseButton>
        </form>
    </template>
</template>