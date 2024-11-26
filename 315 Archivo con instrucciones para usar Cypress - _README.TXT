USO DE CYPRESS PARA PRUEBAS e2e
-------------------------------

PASO1: Para instalar Cypress usar el comando:

npm install cypress --save-dev

PASO 2: Agregar en tsconfig.json el valor "jshintConfig" debajo de "description", de modo que quede así:

  "description": "An Ionic project",
  "jshintConfig": {
    "esversion": 6
  }

PASO 3: Agregar en package.json el valor "types": ["cypress"], debajo de la lista "lib", de modo que quede así:

    "lib": ["es2018", "dom"],
    "types": ["cypress"],

PASO 4: Antes de ejecutar las pruebas poner nombres a los controles gráficos usando el atributo id, por ejemplo:

    En foro.component.html:

      <ion-input id="titulo" [(ngModel)]="publicacion.titulo" label="Título" labelPlacement="floating"></ion-input>
      <ion-textarea id="contenido" [(ngModel)]="publicacion.contenido" label="Contenido" labelPlacement="floating"></ion-textarea>
      <ion-button id="limpiar" (click)="limpiarPublicacion()">Limpiar</ion-button>
      <ion-button id="guardar" (click)="guardarPublicacion()">Guardar</ion-button>

    En qr.component.html:

        <h1 id="saludo">

    En ingreso.page.html

        <ion-input id="correo" [(ngModel)]="correo" type="text" label="Correo" labelPlacement="floating"></ion-input>
        <ion-input id="password" [(ngModel)]="password" type="password" label="Contraseña" labelPlacement="floating"></ion-input>

PASO 5: Configurar archivo "cypress.config.ts" indicando la URL de nuestra aplicación:

import { defineConfig } from 'cypress'

export default defineConfig({
  
  e2e: {
    'baseUrl': 'http://localhost:8100'
  },
  
  
  component: {
    devServer: {
      framework: 'angular',
      bundler: 'webpack',
    },
    specPattern: '**/*.cy.ts'
  }
  
})

PASO 6: Para ejecutar las pruebas en Cypress usar el comando:

npx cypress open


PERMISOS PARA USAR LA CAMARA EN EL CELULAR
------------------------------------------

Para que pida los permisos de la cámara, hay que modificar el AndroidManifest.xml.

En la carpeta: android/app/src/main/AndroidManifest.xml se debe agregar lo siguiente:

    1. xmlns:tools="http://schemas.android.com/tools"
    2. android:hardwareAccelerated="true"
    3. <meta-data android:name="com.google.mlkit.vision.DEPENDENCIES" android:value="barcode_ui"/>
    4. <uses-permission android:name="android.permission.CAMERA" />
    5. <uses-permission android:name="android.permission.FLASHLIGHT"/>
    6. <uses-sdk tools:overrideLibrary="com.google.zxing.client.android" />

Para mostar donde se ponen estas líneas, voy a entregar un archivo completo de ejemplo:

<?xml version="1.0" encoding="utf-8"?>
<!-- 
 CGV: Agregar lo siguiente para poder escanear Códigos QR
    1. xmlns:tools="http://schemas.android.com/tools"
    2. android:hardwareAccelerated="true"
    3. <meta-data android:name="com.google.mlkit.vision.DEPENDENCIES" android:value="barcode_ui"/>
    4. <uses-permission android:name="android.permission.CAMERA" />
    5. <uses-permission android:name="android.permission.FLASHLIGHT"/>
    6. <uses-sdk tools:overrideLibrary="com.google.zxing.client.android" />
-->
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools">
    <application
        android:allowBackup="true"
        android:hardwareAccelerated="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/AppTheme">

        <activity
            android:configChanges="orientation|keyboardHidden|keyboard|screenSize|locale|smallestScreenSize|screenLayout|uiMode"
            android:name=".MainActivity"
            android:label="@string/title_activity_main"
            android:theme="@style/AppTheme.NoActionBarLaunch"
            android:launchMode="singleTask"
            android:exported="true">

            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>

        </activity>

        <provider
            android:name="androidx.core.content.FileProvider"
            android:authorities="${applicationId}.fileprovider"
            android:exported="false"
            android:grantUriPermissions="true">
            <meta-data
                android:name="android.support.FILE_PROVIDER_PATHS"
                android:resource="@xml/file_paths"></meta-data>
        </provider>
        <meta-data android:name="com.google.mlkit.vision.DEPENDENCIES" android:value="barcode_ui"/>
    </application>

    <!-- Permissions -->

    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.CAMERA" />
    <uses-permission android:name="android.permission.FLASHLIGHT"/>
    <uses-sdk tools:overrideLibrary="com.google.zxing.client.android" />

</manifest>


PROBLEMAS CONOCIDOS DE CYPRESS
------------------------------

1) ERROR: Su proyecto no contiene un archivo de soporte predeterminado. Esperamos que exista un archivo que coincida con cypress\support\e2e.{js,jsx,ts,tsx}

URL que explica el error: https://github.com/cypress-io/cypress/issues/22040

Solución: En cypress.config.ts agregar supportFile de la siguiente forma:

  e2e: {
    'baseUrl': 'http://localhost:8100'
    'supportFile': false
  },

2) ERROR:  Option 'sourceMap' cannot be specified with option 'inlineSourceMap'

URL que explica el error: https://stackoverflow.com/questions/42041056/nativescript-typescript-error-error-ts5053-option-sourcemap-cannot-be-spe

Solución: En tsconfig.json cambiar sourceMap por false:

"sourceMap": false,