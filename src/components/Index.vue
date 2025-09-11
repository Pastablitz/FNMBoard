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
        //'https://images.squarespace-cdn.com/content/v1/5c76bcd990f90464d7970263/1551823761724-7Y0EL0TSJAQ0ZQTX0AZM/Banner-Ixalan.jpg?format=2500w',
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
        'https://images.squarespace-cdn.com/content/v1/5c76bcd990f90464d7970263/1551823900140-3WD41S8OR09N5KTRZUO0/Banner-Fiora.jpg?format=2500w'
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