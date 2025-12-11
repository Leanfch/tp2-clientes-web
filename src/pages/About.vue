<script>
import MainTitle from '../components/MainTitle.vue';
export default {
    name: 'About',
    components: { MainTitle }
}
</script>

<template>
    <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 -mx-4 -mt-4 px-4 md:px-8 py-16">
        <div class="max-w-5xl mx-auto">
            <!-- Header Section -->
            <div class="text-center mb-16">
                <h1 class="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                    Quiénes <span class="bg-gradient-to-r from-orange-600 to-red-500 bg-clip-text text-transparent">Somos</span>
                </h1>
                <div class="w-24 h-1 bg-gradient-to-r from-orange-600 to-red-500 mx-auto rounded-full"></div>
            </div>

            <!-- Image & Intro -->
            <div class="bg-white rounded-3xl shadow-xl overflow-hidden mb-12">
                <div class="md:flex">
                    <div class="md:w-1/2">
                        <img class="w-full h-full object-cover" src="/img/hosting.png" alt="Representación de servicios de hosting">
                    </div>
                    <div class="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                        <h2 class="text-3xl font-bold text-gray-900 mb-4">¿Qué es VitaHost?</h2>
                        <p class="text-lg text-gray-700 leading-relaxed">
                            Somos una empresa apasionada por brindar servicios de alojamiento web de
                            <strong class="text-orange-600">alta calidad</strong>. Fundada con la visión de facilitar
                            la presencia en línea de individuos y empresas, nos esforzamos por ofrecer soluciones
                            <strong class="text-orange-600">confiables y asequibles</strong>.
                        </p>
                    </div>
                </div>
            </div>

            <!-- Cards Section -->
            <div class="grid md:grid-cols-2 gap-8 mb-12">
                <!-- Misión -->
                <div class="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                    <div class="w-12 h-12 bg-gradient-to-r from-orange-600 to-red-500 rounded-xl flex items-center justify-center mb-6">
                        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                        </svg>
                    </div>
                    <h3 class="text-2xl font-bold text-gray-900 mb-4">Nuestra Misión</h3>
                    <p class="text-gray-700 leading-relaxed">
                        Ayudarte a alcanzar tus objetivos en línea, ya sea a través de la creación de sitios web,
                        blogs o tiendas en línea. Ofrecemos un servicio de hosting
                        <strong class="text-orange-600">rápido, seguro y de fácil uso</strong>, respaldado por un equipo
                        de soporte <strong class="text-orange-600">comprometido</strong>.
                    </p>
                </div>

                <!-- Valores -->
                <div class="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                    <div class="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mb-6">
                        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                        </svg>
                    </div>
                    <h3 class="text-2xl font-bold text-gray-900 mb-4">Nuestros Valores</h3>
                    <p class="text-gray-700 leading-relaxed">
                        En VitaHost, valoramos la <strong class="text-purple-600">satisfacción del cliente</strong> y la
                        <strong class="text-purple-600">excelencia</strong> en el servicio. Estamos aquí para apoyarte en
                        cada paso de tu viaje en línea y garantizar que tu presencia en la web sea un
                        <strong class="text-purple-600">éxito</strong>.
                    </p>
                </div>
            </div>

            <!-- CTA Final -->
            <div class="bg-gradient-to-r from-orange-600 to-red-500 rounded-3xl shadow-2xl p-8 md:p-12 text-center text-white">
                <h3 class="text-3xl md:text-4xl font-bold mb-4">¿Listo para comenzar?</h3>
                <p class="text-lg md:text-xl mb-8 opacity-90">
                    Gracias por confiar en nosotros como tu proveedor de hosting. Esperamos trabajar contigo y ayudarte a alcanzar tus metas en línea.
                </p>
                <router-link to="/"
                    class="inline-block px-8 py-4 bg-white text-orange-600 font-bold rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                    Ver Planes de Hosting
                </router-link>
            </div>
        </div>
    </div>
</template>