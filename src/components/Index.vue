<template>
<div class="v-index">
    <div
      v-for="(bg, i) in backgrounds"
      :key="i"
      class="background-layer"
      :style="{ backgroundImage: `url(${bg.url})`, opacity: bg.active ? 1 : 0 }"
          >
        </div>
    <v-menu class="clock"/>
    <router-view @change-bg="updateBackground"/>
  </div>
</template>

<script>
export default {
  data() {
    return {
            backgrounds: [{ url: "https://images.squarespace-cdn.com/content/v1/5c76bcd990f90464d7970263/1558564938461-VS31OECSGB9FQM4WR3DY/Sam+Burley.jpg", active: true }], 
            bgUrls: [
        'https://images.squarespace-cdn.com/content/v1/5c76bcd990f90464d7970263/1551297384976-5ZB2Q1T8SYT0UNN8MBE3/Banner-Alara.jpg?format=2500w',
        'https://images.squarespace-cdn.com/content/v1/5c76bcd990f90464d7970263/1551823991941-VJDOEDB3M8NM4N95OH7D/Banner-Amonkhet.jpg?format=2500w',
        'https://images.squarespace-cdn.com/content/v1/5c76bcd990f90464d7970263/1620659166691-GZ246UYDGEJBE2OIELAR/Banner-Arcavios.jpg?format=2500w',
        'https://images.squarespace-cdn.com/content/v1/5c76bcd990f90464d7970263/1551823716711-X3UNOG34FVGO5XOTAFG6/Banner-Kaladesh.jpg?format=2500w',
        'https://images.squarespace-cdn.com/content/v1/5c76bcd990f90464d7970263/3d1f98dd-1587-4807-a46b-13d3c64fe901/Azgol-Banner.jpg?format=2500w',
        'https://images.squarespace-cdn.com/content/v1/5c76bcd990f90464d7970263/1cbb1f0b-eb5b-4d2f-a140-2fa1b254ac40/Duskmourn%2BBanner.jpg?format=2500w',
        'https://images.squarespace-cdn.com/content/v1/5c76bcd990f90464d7970263/1551297716053-HJRNFVYQ119ZS74J1TXG/Banner-Dominaria.jpg?format=2500w',
        'https://images.squarespace-cdn.com/content/v1/5c76bcd990f90464d7970263/038c3b7d-aea4-463b-9cfe-e03cd77db842/Bloomburrow+Banner.jpg?format=2500w',
        'https://images.squarespace-cdn.com/content/v1/5c76bcd990f90464d7970263/1620659463411-09EIPNOW143JSY0JJ726/Banner-BlindEternities.jpg?format=2500w',
        'https://images.squarespace-cdn.com/content/v1/5c76bcd990f90464d7970263/a308ab06-c07b-4668-a1b0-29aa9bdef7e4/Belenon-Banner.jpg?format=2500w',
        'https://images.squarespace-cdn.com/content/v1/5c76bcd990f90464d7970263/1563817785353-M9XM7VG9E368HAB5D80D/Banner-Eldraine.jpg?format=2500w',
        'https://images.squarespace-cdn.com/content/v1/5c76bcd990f90464d7970263/1620659216033-SPEPFZ1RM29FU9ANQ1LG/Banner-Equilor.jpg?format=2500w',
        'https://images.squarespace-cdn.com/content/v1/5c76bcd990f90464d7970263/9a3e0856-b503-4967-823e-ca1a3658ac56/Ergamon-Banner.jpg?format=2500w',
        'https://images.squarespace-cdn.com/content/v1/5c76bcd990f90464d7970263/1551823900140-3WD41S8OR09N5KTRZUO0/Banner-Fiora.jpg?format=2500w',
        'https://images.squarespace-cdn.com/content/v1/5c76bcd990f90464d7970263/1551823761724-7Y0EL0TSJAQ0ZQTX0AZM/Banner-Ixalan.jpg?format=2500w',
        'https://images.squarespace-cdn.com/content/v1/5c76bcd990f90464d7970263/1551823788332-GXXFJX0HEC5U8OCBO5CQ/Banner-Ir.jpg?format=2500w',
        'https://images.squarespace-cdn.com/content/v1/5c76bcd990f90464d7970263/1551823815380-K9P0CEHKDVMBQILJIGIB/Banner-Iquatna.jpg?format=2500w',
        'https://images.squarespace-cdn.com/content/v1/5c76bcd990f90464d7970263/1551823860297-I4105VIQKWF1Q0VOHAN3/Banner-Innistrad.jpg?format=2500w',
        'https://images.squarespace-cdn.com/content/v1/5c76bcd990f90464d7970263/1586628075166-ZD7YIMWDE426Y5H0LA5R/Banner-Ikoria.jpg?format=2500w',
        'https://images.squarespace-cdn.com/content/v1/5c76bcd990f90464d7970263/357bba7b-d6f6-4f55-901d-be2e606ffe01/Gobakhan-Banner.jpg?format=2500w',
        'https://images.squarespace-cdn.com/content/v1/5c76bcd990f90464d7970263/9e5715f7-40fb-4ca8-a8c6-8705f89b2cba/Banner-Gastal.jpg?format=2500w',
        'https://images.squarespace-cdn.com/content/v1/5c76bcd990f90464d7970263/1620659395410-MCLFR3FIC5F3M0024OO6/Banner-DND.jpg?format=2500w',
        'https://images.squarespace-cdn.com/content/v1/5c76bcd990f90464d7970263/1620659265073-ZRIWOEDN0K0BAQQMHBSS/Banner-Fabacin.jpg?format=2500w',
        'https://images.squarespace-cdn.com/content/v1/5c76bcd990f90464d7970263/1620659243370-HFE4WCZO8X0PVUG9YWAW/Fabacin-Icon.jpg?format=500w',
        'https://images.squarespace-cdn.com/content/v1/5c76bcd990f90464d7970263/1551824117422-A3R66NCE0IT0SFBIJR8R/Banner-NewPhyrexia.jpg?format=2500w',
        'https://images.squarespace-cdn.com/content/v1/5c76bcd990f90464d7970263/a18c7bd5-c2a0-4d0d-a947-caeb476778aa/Capenna-Banner.png?format=2500w',
        'https://images.squarespace-cdn.com/content/v1/5c76bcd990f90464d7970263/1551824187371-BC4I6ZBBDD01LKUEVAFV/Banner-Muraganda.jpg?format=2500w',
        'https://images.squarespace-cdn.com/content/v1/5c76bcd990f90464d7970263/2ea01e46-e80d-4b02-b088-926069279ec6/Moag-Banner.jpg?format=2500w',
        'https://images.squarespace-cdn.com/content/v1/5c76bcd990f90464d7970263/1551824054559-6T8RBHA6XCV529H0BEVW/Banner-Mirrodin.jpg?format=2500w',
        'https://images.squarespace-cdn.com/content/v1/5c76bcd990f90464d7970263/1551823641137-LOZ49Q1ORPLB5I8A9EXE/Banner-Mercadia.jpg?format=2500w',
        'https://images.squarespace-cdn.com/content/v1/5c76bcd990f90464d7970263/1551810088982-QHK0VWAP347A07FCGWT8/Banner-Meditationrealm.jpg?format=2500w',
        'https://images.squarespace-cdn.com/content/v1/5c76bcd990f90464d7970263/1551823666056-VNNYY7LWIP9PRVW8I97M/Banner-Lorwyn.jpg?format=2500w',
        'https://images.squarespace-cdn.com/content/v1/5c76bcd990f90464d7970263/1551823688842-LIAN4Y1XWLINDTX3E12U/Banner-Kylem.jpg?format=2500w',
        'https://images.squarespace-cdn.com/content/v1/5c76bcd990f90464d7970263/1551810114540-J1Z3M5TN4ELRRYL0JQZD/Banner-Kamigawa.jpg?format=2500w',
        'https://images.squarespace-cdn.com/content/v1/5c76bcd990f90464d7970263/1610409200546-VMN8Z0IS5ZQQO3YMGN40/Banner-Kaldheim-2.jpg?format=2500w',
        'https://images.squarespace-cdn.com/content/v1/5c76bcd990f90464d7970263/35c626a7-1523-41d0-a8d6-e81c27b291f3/Zhalfir-Banner+copy.jpg?format=2500w',
        'https://images.squarespace-cdn.com/content/v1/5c76bcd990f90464d7970263/1551825341676-XJV0UIB87QI4W3G267XX/Banner-Zendikar.jpg?format=2500w',
        'https://images.squarespace-cdn.com/content/v1/5c76bcd990f90464d7970263/1551825281245-7Q4JQOMFE39N2YARO10O/Banner-Wildfire.jpg?format=2500w',
        'https://images.squarespace-cdn.com/content/v1/5c76bcd990f90464d7970263/1551825025831-JHYDTDELYWYQT6E6EG4W/Banner-Theros.jpg?format=2500w',
        'https://images.squarespace-cdn.com/content/v1/5c76bcd990f90464d7970263/1551824913819-FJVH0ZFG580WQXW68O6L/Banner-Tarkir.jpg?format=2500w',
        'https://images.squarespace-cdn.com/content/v1/5c76bcd990f90464d7970263/1551824729508-D51P53QPEEYW58D1ZR43/Banner-Serra.jpg?format=2500w',
        'https://images.squarespace-cdn.com/content/v1/5c76bcd990f90464d7970263/1551824796930-DW2C4UL2W9PFOGRPELJO/Banner-Shandalar.jpg?format=2500w',
        'https://images.squarespace-cdn.com/content/v1/5c76bcd990f90464d7970263/1551824616536-P3LT8817YAG673IX31AR/Banner-Ravnica.jpg?format=2500w',
        'https://images.squarespace-cdn.com/content/v1/5c76bcd990f90464d7970263/1551824446232-NGJOCW7571QIWP9SMAE9/Banner-Rabiah.jpg?format=2500w',
        'https://images.squarespace-cdn.com/content/v1/5c76bcd990f90464d7970263/1620659317325-72JAF5KF1EZL9YTJ40YM/Banner-Pyrulea.jpg?format=2500w',
        'https://images.squarespace-cdn.com/content/v1/5c76bcd990f90464d7970263/1551824257723-7K8K6UBX1XYVNHL9BLVB/Banner-Phyrexia.jpg?format=2500w',
         'https://images.squarespace-cdn.com/content/v1/5c76bcd990f90464d7970263/1551823900140-3WD41S8OR09N5KTRZUO0/Banner-Fiora.jpg?format=2500w',
        // new options that would need downloading
        // 'https://www.artofmtg.com/wp-content/uploads/2024/11/Mountain-2-Foundations-MtG-Art-scaled.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2023/10/Tempest-Hart-Wilds-of-Eldraine-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2023/10/Beanstalk-Wurm-Wilds-of-Eldraine-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2024/01/Hedge-Maze-Murders-at-Karlov-Manor-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2024/01/Topiary-Panther-Murders-at-Karlov-Manor-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2023/11/Xolatoyac-the-Smiling-Flood-The-Lost-Caverns-of-Ixalan-MtG-Art-scaled.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2023/10/The-Myriad-Pools.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2023/10/Treasure-Cove.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2023/10/The-Core.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2023/10/Temple-of-Cyclical-Time.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2023/10/Mountain-2.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2024/12/Maha-Its-Feathers-Night-Bloomburrow-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2024/11/Swamp-Bloomburrow-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2024/11/Harvestrite-Host-Bloomburrow-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2024/11/Lupinflower-Village-Bloomburrow-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2024/11/Genesis-Wave-Foundations-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2024/11/Preposterous-Proportions-Foundations-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2024/12/Fountainport-Bloomburrow-MtG-Art-scaled.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2024/11/Preposterous-Proportions-2-Foundations-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2024/12/Beza-the-Bounding-Spring-Bloomburrow-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2024/11/Mountain-Foundations-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2022/12/Stomping-Ground-Unfinity-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2022/12/Plains-Unfinity-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2022/12/Forest-2-Unfinity-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2022/12/Godless-Shrine-Unfinity-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2022/12/Watery-Grave-Unfinity-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2022/12/Mountain-Unfinity-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2022/12/Swamp-Unfinity-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2022/12/Island-Unfinity-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2022/12/Forest-Unfinity-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2022/12/Breeding-Pool-Unfinity-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2022/12/Blood-Crypt-Unfinity-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2022/12/Trapeze-Artist-Unfinity-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2022/12/Astroquarium-Unfinity-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2022/12/How-Is-This-a-Par-Three-Unfinity-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2022/12/Hallowed-Fountain-Unfinity-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2022/12/Island-2-Unfinity-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2022/12/Swamp-2-Unfinity-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2022/12/Mountain-2-Unfinity-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2022/12/Plains-2-Unfinity-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2022/09/Tangled-Islet-Dominaria-United-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2022/09/Gibbering-Barricade-Dominaria-United-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2022/09/Adarkar-Wastes-Dominaria-United-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2022/09/Karplusan-Forest-Dominaria-United-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2022/09/Hexbane-Tortoise-Dominaria-United-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2022/08/Radiant-Grove-Dominaria-United-MtG-Art-scaled.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2022/08/Leyline-Binding-Dominaria-United-MtG-Art-scaled.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2022/08/Haunted-Mire-Dominaria-United-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2022/08/Crystal-Grotto-Dominaria-United-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2022/08/Jodahs-Codex-Dominaria-United-MtG-Art.jpg'
        // 'https://www.artofmtg.com/wp-content/uploads/2022/08/Swamp-2-Dominaria-United-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2022/08/Yavimaya-Coast-Dominaria-United-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2022/08/Yavimaya-Coast-Variant-Dominaria-United-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2022/08/Caves-of-Koilos-Variant-Dominaria-United-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2022/08/Sulfurous-Springs-Variant-Dominaria-United-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2022/08/Shivan-Reef-Dominaria-United-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2022/08/Caves-of-Koilos-Dominaria-United-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2022/08/Plains-2-Dominaria-United-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2022/12/Argoth-Sanctum-of-Nature-The-Brothers-War-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2022/12/Underground-River-The-Brothers-War-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2022/12/Titania-Gaea-Incarnate-The-Brothers-War-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2022/12/Brushland-The-Brothers-War-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2022/12/Take-Flight-The-Brothers-War-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2022/12/Battlefield-Forge-The-Brothers-War-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2022/12/Phyrexian-Fleshgorger-The-Brothers-War-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2022/12/Swamp-The-Brothers-War-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2022/12/Mountain-The-Brothers-War-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2022/12/Swarm-of-Bloodflies-Jumpstart-2022-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2022/12/Isu-the-Abominable-Jumpstart-2022-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2022/02/Collision-of-Realms-Kamigawa-Neon-Dynasty-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2022/02/Mech-Hangar-Kamigawa-Neon-Dynasty-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2022/02/Island-Variant-Kamigawa-Neon-Dynasty-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2022/02/March-of-Swirling-Mist-Kamigawa-Neon-Dynasty-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2022/02/Mountain-Variant-2-Kamigawa-Neon-Dynasty-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2022/02/Mountain-Variant-Kamigawa-Neon-Dynasty-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2022/02/Explosive-Singularity-Kamigawa-Neon-Dynasty-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2022/02/Kyodai-Soul-of-Kamigawa-Variant-Kamigawa-Neon-Dynasty-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2022/02/Takenuma-Abandoned-Mire-Kamigawa-Neon-Dynasty-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2022/02/Swamp-1-Kamigawa-Neon-Dynasty-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2022/02/Island-1-Kamigawa-Neon-Dynasty-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2022/02/Mountain-1-Kamigawa-Neon-Dynasty-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2022/02/Otawara-Soaring-City-Variant-Kamigawa-Neon-Dynasty-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2022/02/Plains-1-Kamigawa-Neon-Dynasty-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2022/02/Forest-1-Kamigawa-Neon-Dynasty-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2022/02/Release-to-Memory-Kamigawa-Neon-Dynasty-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2022/02/Go-Shintai-of-Ancient-Wars-Kamigawa-Neon-Dynasty-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2022/02/Neon-Dynasty-Marketing-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2022/02/Swiftwater-Cliffs-Kamigawa-Neon-Dynasty-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2022/02/Mountain-Kamigawa-Neon-Dynasty-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2022/02/Swamp-Kamigawa-Neon-Dynasty-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2022/02/Scoured-Barrens-Kamigawa-Neon-Dynasty-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2022/02/Plains-Kamigawa-Neon-Dynasty-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2022/02/Uncharted-Haven-Kamigawa-Neon-Dynasty-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2022/02/Eiganjo-Seat-of-the-Empire-Kamigawa-Neon-Dynasty-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2022/02/Bloodfell-Caves-Kamigawa-Neon-Dynasty-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2022/02/Rugged-Highlands-Kamigawa-Neon-Dynasty-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2022/02/Otawara-Soaring-City-Kamigawa-Neon-Dynasty-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2022/02/Mechtitan-Token-Kamigawa-Neon-Dynasty-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2022/02/Discover-the-Impossible-Kamigawa-Neon-Dynasty-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2022/02/Discover-the-Impossible-Kamigawa-Neon-Dynasty-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2022/01/Invoke-Despair-Kamigawa-Neon-Dynasty-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2022/01/Boseiju-Who-Endures-Kamigawa-Neon-Dynasty-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2022/01/The-Modern-Age-Kamigawa-Neon-Dynasty-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2022/03/Xanders-Lounge-Streets-of-New-Capenna-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2022/03/Forest-Streets-of-New-Capenna-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2022/03/Plains-Streets-of-New-Capenna-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2022/03/Island-Streets-of-New-Capenna-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2022/03/Plains-2-Streets-of-New-Capenna-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2022/03/Jetmirs-Garden-Streets-of-New-Capenna-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2022/03/Raffines-Tower-Variant-2-Streets-of-New-Capenna-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2022/03/Mountain-Streets-of-New-Capenna-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2022/04/Botanical-Plaza-Variant-Streets-of-New-Capenna-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2022/04/All-Seeing-Arbiter-Variant-Streets-of-New-Capenna-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2022/04/Shadow-of-Mortality-Variant-Streets-of-New-Capenna-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2022/04/Mountain-2-Streets-of-New-Capenna-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2023/01/Pull-from-Tomorrow-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2022/04/Capenna-Express-Streets-of-New-Capenna-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2022/07/Dragonlord-Dromoka-Variant-Double-Masters-2022-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2022/07/Emrakul-the-Aeons-Torn-Variant-Double-Masters-2022-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2022/06/Rampant-Growth-Double-Masters-2022-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2022/06/Orzhov-Basilica-Double-Masters-2022-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2022/06/Cryptic-Spires-Double-Masters-2022-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2022/06/Golgari-Rot-Farm-Double-Masters-2022-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2022/06/Kozilek-Butcher-of-Truth-Double-Masters-2022-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2022/06/Azorius-Chancery-Double-Masters-2022-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2022/05/Forest-Battle-for-Baldurs-Gate-Battle-for-Baldurs-Gate-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2022/05/Baldurs-Gate-Battle-for-Baldurs-Gate-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2022/05/Morphic-Pool-Battle-for-Baldurs-Gate-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2022/05/Mountain-Battle-for-Baldurs-Gate-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2022/05/Reflecting-Pool-Battle-for-Baldurs-Gate-MtG-Art.jpg',
        // 'https://www.artofmtg.com/wp-content/uploads/2022/05/Elder-Brain-Variant-Battle-for-Baldurs-Gate-MtG-Art.jpg',
        //'https://www.artofmtg.com/wp-content/uploads/2022/05/You-Look-Upon-the-Tarrasque-Battle-for-Baldurs-Gate-MtG-Art.jpg'
        //  from        https://www.artofmtg.com/mtg-sets/ up to 2022
      ]
    }
  },
  methods: {
    updateBackground() {
      const randomIndex = Math.floor(Math.random() * this.bgUrls.length)
      const newImage = this.bgUrls[randomIndex]

      // deactivate old ones
      this.backgrounds.forEach(bg => (bg.active = false))

      // add new one, but inactive (opacity 0)
      const newBg = { url: newImage, active: false }
      this.backgrounds.push(newBg)

      // wait for DOM update, then wait a bit more to ensure opacity 0 is applied
      this.$nextTick(() => {
        setTimeout(() => {
          newBg.active = true
        }, 10) // small delay to ensure the opacity 0 state is rendered
      })

    }
  }
}
</script>

<style lang="scss" scoped>
.v-index {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  //transition: opacity 8s ease-in-out;

}

.clock {
  position: fixed; 
  top: 0;
  left: 50%;
  transform: translate(-50%);
}

.background-layer {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  transition: opacity 8s ease-in-out;
  z-index: -1;
}

</style>