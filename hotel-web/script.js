import { db } from './firebase-config.js';
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

// Obtener Habitación de URL
const urlParams = new URLSearchParams(window.location.search);
const roomNumber = urlParams.get('room') || "Lobby";
document.getElementById('room-number').textContent = roomNumber;

// Selección de Servicios
let selectedService = "";
let selectedServiceName = "";
let selectedServiceIcon = "";

const serviceBtns = document.querySelectorAll('.service-btn');
serviceBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        serviceBtns.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        selectedService = btn.dataset.service;
        selectedServiceName = btn.querySelector('span').textContent;
        selectedServiceIcon = btn.dataset.icon;
    });
});

// Enviar Solicitud Principal
const submitBtn = document.getElementById('submit-request');
submitBtn.addEventListener('click', async () => {
    if (!selectedService) {
        alert("Por favor seleccione una opción tocando un botón.");
        return;
    }

    const comment = document.getElementById('guest-comment').value;

    try {
        submitBtn.disabled = true;
        submitBtn.textContent = "Procesando...";

        await addDoc(collection(db, "requests"), {
            room: roomNumber,
            serviceName: selectedServiceName,
            comment: comment,
            status: "pending",
            timestamp: serverTimestamp()
        });

        // Feedback Visual Mejorado
        const successMsg = document.getElementById('success-msg');
        const successIcon = document.getElementById('success-icon');
        successIcon.className = `fa-solid ${selectedServiceIcon}`;
        
        successMsg.style.display = 'block';
        
        // El mensaje permanece 7 segundos
        setTimeout(() => {
            successMsg.style.display = 'none';
            serviceBtns.forEach(b => b.classList.remove('selected'));
            document.getElementById('guest-comment').value = '';
            selectedService = '';
            submitBtn.disabled = false;
            submitBtn.textContent = "Pedir Servicio";
        }, 7000);

    } catch (e) {
        alert("Error de conexión. Por favor intente de nuevo.");
        submitBtn.disabled = false;
        submitBtn.textContent = "Pedir Servicio";
    }
});

// Enviar Sugerencia
const submitSuggBtn = document.getElementById('submit-suggestion');
submitSuggBtn.addEventListener('click', async () => {
    const text = document.getElementById('suggestion-text').value.trim();
    if (!text) {
        alert("Por favor escriba un comentario antes de enviar.");
        return;
    }

    try {
        submitSuggBtn.disabled = true;
        submitSuggBtn.textContent = "Enviando...";

        // Se guarda en una nueva colección llamada "suggestions"
        await addDoc(collection(db, "suggestions"), {
            room: roomNumber,
            text: text,
            timestamp: serverTimestamp()
        });

        const suggSuccess = document.getElementById('suggestion-success');
        suggSuccess.style.display = 'block';
        
        setTimeout(() => {
            suggSuccess.style.display = 'none';
            document.getElementById('suggestion-text').value = '';
            submitSuggBtn.disabled = false;
            submitSuggBtn.textContent = "Enviar Sugerencia";
        }, 5000);

    } catch (e) {
        alert("Error al enviar la sugerencia.");
        submitSuggBtn.disabled = false;
        submitSuggBtn.textContent = "Enviar Sugerencia";
    }
});

// Modal del Restaurante
const modal = document.getElementById('restaurant-modal');
const openModalBtn = document.getElementById('open-restaurant-btn');
const closeModalBtn = document.getElementById('close-modal');

openModalBtn.addEventListener('click', () => modal.style.display = 'flex');
closeModalBtn.addEventListener('click', () => modal.style.display = 'none');
window.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
});