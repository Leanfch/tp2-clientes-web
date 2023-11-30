<script>
export default {
    name: "FooterComponent",
};
</script>
<template>
    <footer class="flex justify-center items-center w-[100%] h-[100px] bg-slate-950 text-white">
        <div class="flex space-x w-[100%]">
            <div class="w-[33%]">
                <ul class="text-center">
                    <li>Leandro Martín Fernández Chapotot</li>
                    <li>DWN4BV</li>
                    <li>2023</li>
                </ul>
            </div>
            <div class="w-[33%] flex justify-center">
                <img class="w-[70px] p-2 rounded-md" src="/vitahost.svg" alt="Logo de vitahost">
            </div>
            <div class="w-[33%]">
                <ul class="text-center">
                    <li>Santiago Gallino</li>
                    <li>Clientes Web Mobile</li>
                    <li>Tp nro 2</li>
                </ul>
            </div>
        </div>
    </footer>
</template>