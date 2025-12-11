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
            if (!this.newMessage.message.trim()) return;

            sendPrivateChatMessage({
                senderId: this.authUser.id,
                receiverId: this.user.id,
                message: this.newMessage.message
            });

            // Limpiar el input después de enviar
            this.newMessage.message = '';
        },
        handleKeydown(event) {
            // Enviar con Enter (sin Shift)
            if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                this.handleSendMessage();
            }
            // Shift + Enter permite nueva línea (comportamiento por defecto)
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
    <div class="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 -mx-4 -mt-4 px-2 sm:px-4 md:px-8 py-4 md:py-8">
        <div v-if="userLoading" class="flex items-center justify-center py-20">
            <LoaderCircle />
        </div>
        <template v-else>
            <div class="max-w-5xl mx-auto">
                <!-- Header -->
                <div class="bg-white rounded-t-2xl md:rounded-t-3xl shadow-lg p-4 md:p-6 border-b border-gray-200">
                    <div class="flex items-center gap-3 md:gap-4">
                        <div class="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-slate-600 to-gray-600 rounded-full flex items-center justify-center text-white font-bold text-base md:text-lg">
                            {{ user.email.charAt(0).toUpperCase() }}
                        </div>
                        <div class="min-w-0 flex-1">
                            <h1 class="text-lg md:text-2xl font-bold text-gray-900 truncate">{{ user.email }}</h1>
                            <p class="text-xs md:text-sm text-gray-500">Chat privado</p>
                        </div>
                    </div>
                </div>

                <!-- Messages Container -->
                <h2 class="sr-only">Mensajes</h2>
                <div class="bg-white shadow-lg min-h-[400px] md:min-h-[500px] max-h-[500px] md:max-h-[600px] overflow-y-auto p-3 md:p-6 space-y-3 md:space-y-4">
                    <div v-if="messagesLoading" class="flex items-center justify-center py-20">
                        <LoaderCircle />
                    </div>
                    <template v-else>
                        <div v-for="message in messages" :key="message.id"
                            class="flex" :class="{
                                'justify-end': message.senderId === authUser.id,
                                'justify-start': message.senderId !== authUser.id,
                            }">
                            <div class="max-w-[85%] sm:max-w-[75%] md:max-w-[60%]" :class="{
                                'bg-gradient-to-r from-slate-600 to-gray-600 text-white': message.senderId === authUser.id,
                                'bg-gray-100 text-gray-900': message.senderId !== authUser.id,
                            }" style="border-radius: 18px; padding: 10px 14px;">
                                <div class="break-words text-sm md:text-base">{{ message.message }}</div>
                                <div class="text-xs mt-1 opacity-75" :class="{
                                    'text-right': message.senderId === authUser.id,
                                }">
                                    {{ formatDate(message.created_at) || 'Enviando...' }}
                                </div>
                            </div>
                        </div>
                    </template>
                </div>

                <!-- Input Form -->
                <h2 class="sr-only">Enviar mensajes</h2>
                <form class="bg-white rounded-b-2xl md:rounded-b-3xl shadow-lg p-3 md:p-4 flex flex-col sm:flex-row gap-2 sm:gap-3" action="#" @submit.prevent="handleSendMessage">
                    <label for="message" class="sr-only">Mensaje</label>
                    <BaseTextarea id="message"
                        class="flex-1 px-3 md:px-4 py-2 md:py-3 border-2 border-gray-200 rounded-xl focus:border-slate-500 focus:outline-none transition-colors resize-none text-sm md:text-base"
                        rows="2"
                        placeholder="Escribe tu mensaje..."
                        v-model="newMessage.message"
                        @keydown="handleKeydown" />
                    <BaseButton class="w-full sm:w-auto px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-slate-600 to-gray-600 hover:from-slate-700 hover:to-gray-700 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl sm:self-end text-sm md:text-base">
                        Enviar
                    </BaseButton>
                </form>
            </div>
        </template>
    </div>
</template>