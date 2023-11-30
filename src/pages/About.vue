<script>
import MainTitle from '../components/MainTitle.vue';
export default {
    name: 'About',
    components: { MainTitle }
}
</script>

<template>
    <div class="flex">
        <div class="w-[50%] mx-auto flex flex-col justify-center items-center">
            <MainTitle>Quienes somos</MainTitle>
            <img class="mb-5 rounded shadow-xl" src="/img/hosting.png" alt="Dibujo vectorizado que representa un hosting">
            <p class="mb-3 text-xl">¿Qué es <em>VitaHost</em>? somos una empresa apasionada por brindar servicios de
                alojamiento
                web de
                <strong>alta calidad</strong>. Fundada con
                la
                visión de facilitar la presencia en línea de individuos y empresas, nos esforzamos por ofrecer soluciones de
                alojamiento <strong>confiables y asequibles</strong>.
            </p>
            <p class="mb-3 text-xl">Nuestra misión es ayudarte a alcanzar tus objetivos en línea, ya sea a través de la
                creación
                de
                sitios web,
                blogs,
                o
                tiendas en línea. Nos enorgullece ofrecer un servicio de hosting <strong>rápido, seguro y de fácil
                    uso</strong>,
                respaldado por un
                equipo de soporte <strong>comprometido</strong>.</p>
            <p class="mb-3 text-xl">En VitaHost, valoramos la <strong>satisfacción del cliente</strong> y la
                <strong>excelencia</strong> en el servicio. Estamos
                aquí para
                apoyarte en
                cada
                paso de tu viaje en línea y garantizar que tu presencia en la web sea un <strong>éxito</strong>.
            </p>
            <p class="mb-3 text-xl">Gracias por confiar en nosotros como tu proveedor de hosting. Esperamos trabajar contigo
                y
                ayudarte
                a alcanzar
                tus
                metas en línea.</p>
        </div>
    </div>
</template>