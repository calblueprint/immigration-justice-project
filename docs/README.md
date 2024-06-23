---
home: true
icon: home
title: Immigration Justice Project
heroImage: /assets/image/ijp_logo_full_dark.png
heroImageDark: /assets/image/ijp_logo_full_dark.png
heroFullScreen: true
heroText: IJP Documentation
tagline: Documentation for the user portal application developed by Cal Blueprint
actions:
    - text: For Admins
      icon: user
      link: ./admin/
      type: primary

    - text: For Developers
      icon: code
      link: ./dev/

    - text: For Designers
      icon: pen-nib
      link: ./design/

highlights:
    - header: Goal of the Project
      description: <b>The primary goal of this project is to streamline the process of matching IJP's volunteers to active probono volunteer opportunities.</b> Our mission was to build a web application for IJP volunteers to browse through and apply to available voluunteer opportunities, and for admins to review interests and match volunteers to opportunities through an admin dashboard.
      image: /assets/image/layout.svg 

      

    - header: Core Features
      description: 
      features:
          - title: Listing Pages
            icon: suitcase
            details: >
              The main web application features 3 listing pages: <b>Cases Page</b>, <b>Limited Case Assignments Page</b>, & <b>Language Support Page</b>. On each page, users can browse, filter, and apply to listings.

          - title: Volunteer User Accounts
            icon: address-card
            details: Volunteers that sign up for an account on the web application will gain access to submitting interests for available volunteer opportunities, and will be added to IJP's database of volunteers.

          - title: Admin Dashboard
            icon: person-chalkboard
            details: The Retool Admin Dashboard enables admins to manage volunteer opportunity listings, volunteer interest submissions, and user accounts of the main web application.


    - header: Editing this Site
      description: This site is powered by <a href="https://v2.vuepress.vuejs.org/">VuePress</a> using <a href="https://theme-hope.vuejs.press/">Theme Hope</a>. The Markdown sources can be found on our <a href="https://github.com/calblueprint/immigration-justice-project/tree/docs" target="_blank">GitHub repo</a> on the docs branch.<br/><br/>Run <code>npm docs:dev</code> to run the documentation site locally. By default, it will be hosted at <code>localhost:8080</code>, or whichever link the terminal displays.<br/><br/>We use Netlify for continuous deployment. It's configured to auto-build and deploy to <a href="https://immigration-justice-project-docs.netlify.app">https://immigration-justice-project-docs.netlify.app</a> whenever a commit is pushed to the immigration-justice-project/docs branch.<br/><br/><b>Resources:</b>
      image: /assets/image/advanced.svg
      highlights:
          - title: Guide to VuePress
            icon: book
            details: The basics of VuePress configuration
            link: https://v2.vuepress.vuejs.org/guide/introduction.html

          - title: VuePress Plugins
            icon: puzzle-piece
            details: Plugins to add extra features to VuePress
            link: https://ecosystem.vuejs.press/plugins/append-date.html

          - title: VuePress Hope Theme
            icon: star
            details: Customize settings specific to the Hope Theme
            link: https://ecosystem.vuejs.press/themes/default/config.html

          - title: Markdown Basics
            icon: pen
            details: Read through the basics of Markdown to write content
            link: https://commonmark.org/help/

    - header: Contact
      description: For any questions about the admin or developer side of this project, contact Alvaro Ortiz at <a href="mailto:varortz@berkeley.edu">varortz@berkeley.edu</a>
      

    - header: About
      description: This project was built by one of <a href="https://calblueprint.org/">Cal Blueprint</a>'s team during the 2023-2024 school year.
      features:
          - title:

copyright: false
footer: Learn more about Blueprint and what we do at <a href="https://calblueprint.org" target="_blank">calblueprint.org</a><br/><br/>Theme by <a href="https://theme-hope.vuejs.press/" target="_blank">VuePress Theme Hope</a> | MIT Licensed, Copyright © 2019-present Mr.Hope
---

<h2 style="margin: 0 0 2rem min(5vw, 4rem)">The Team</h2>
<CardContainer>
  <Card
    image="/assets/image/alvaro_ortiz.png"
    name="Alvaro Ortiz"
    currentRole="Project Lead"
    previousRole="Developer"
  />
  <Card
    image="/assets/image/pragya_kallanagoudar.png"
    name="Pragya Kallangoudar"
    currentRole="Developer"
    previousRole="Project Lead"
  />
  <Card
    image="/assets/image/jinkang_fang.png"
    name="Jinkang Fang"
    currentRole="Developer"
  />
  <Card
    image="/assets/image/catherine_tan.png"
    name="Catherine Tan"
    currentRole="Developer"
  />
  <Card
    image="/assets/image/kevin_solorio.png"
    name="Kevin Solorio"
    currentRole="Developer"
  />
  <Card
    image="/assets/image/rahi_hazra.png"
    name="Rahi Hazra"
    currentRole="Developer"
  />
  <Card
    image="/assets/image/kyrene_tam.png"
    name="Kyrene Tam"
    currentRole="Designer"
  />
  <Card
    image="/assets/image/david_qing.png"
    name="David Qing"
    previousRole="Designer"
  />
</CardContainer>
