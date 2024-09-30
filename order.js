const services = {
    notary: [
        { 
            id: 1, 
            name: "Pembuatan Akta Yayasan", 
            requirements: [
                "Fotokopi KTP dan NPWP Pendiri", 
                "Alamat Yayasan", 
                "Email dan nomor telepon Yayasan", 
                "Jumlah nominal kekayaan Yayasan (minimal Rp.10.000.000,00)", 
                "Rencana kegiatan Yayasan", 
                "Dokumen pendukung lainnya (jika diperlukan)"
            ] 
        },
        { 
            id: 2, 
            name: "Pembuatan Akta PT", 
            requirements: [
                "Fotokopi KTP Para Pendiri", 
                "Fotokopi NPWP Pribadi Penanggung Jawab", 
                "Surat Keterangan Domisili", 
                "Pas Foto ukuran 3x4 (2 lembar)", 
                "Jumlah Modal Dasar & Modal Setor", 
                "Komposisi saham", 
                "Naskah Rencana Anggaran Dasar", 
                "Persetujuan nama perusahaan (jika diperlukan)"
            ] 
        },
        { 
            id: 3, 
            name: "Pembuatan Akta CV", 
            requirements: [
                "Fotokopi KTP dan NPWP Pendiri", 
                "Surat Keterangan Domisili", 
                "Email CV", 
                "Besaran Modal Dasar CV dan komposisi saham", 
                "Rencana kerja dan kegiatan CV", 
                "Dokumen pendukung lainnya (jika diperlukan)"
            ] 
        },
        { 
            id: 4, 
            name: "Pembuatan Akta Perkumpulan", 
            requirements: [
                "Memiliki 3 orang anggota", 
                "Akta pendirian", 
                "Program kerja dan sumber pendanaan", 
                "NPWP atas nama perkumpulan", 
                "Rencana kegiatan dan anggaran", 
                "Dokumen identitas anggota"
            ] 
        }
    ],
    ppat: [
        { 
            id: 5, 
            name: "Pembuatan SKMHT", 
            requirements: [
                "Tidak mencantumkan kuasa substitusi", 
                "Identitas jelas kreditur dan debitur", 
                "Dokumen pendukung perjanjian utang (jika ada)", 
                "Surat keterangan dari bank (jika diperlukan)"
            ] 
        },
        { 
            id: 6, 
            name: "Pembuatan APHT", 
            requirements: [
                "Identitas pemberi dan pemegang hak tanggungan", 
                "Surat kuasa (jika dikuasakan)", 
                "Dokumen bukti utang yang jelas", 
                "Sertifikat hak atas tanah"
            ] 
        },
        { 
            id: 7, 
            name: "Pembuatan AJB (Akta Jual Beli)", 
            requirements: [
                "Fotokopi KTP dan KK Penjual dan Pembeli", 
                "NPWP Penjual", 
                "Fotokopi PBB Terakhir", 
                "Sertifikat asli", 
                "Surat pernyataan tidak sengketa", 
                "Dokumen pendukung lainnya (jika ada)"
            ] 
        },
        { 
            id: 8, 
            name: "Pembuatan Akta Hibah", 
            requirements: [
                "Fotokopi identitas pemohon dan penerima", 
                "Sertifikat asli", 
                "Dokumen bukti hubungan antara pemohon dan penerima", 
                "Surat keterangan dari ahli waris (jika diperlukan)"
            ] 
        },
        { 
            id: 9, 
            name: "Pembuatan Akta Waris", 
            requirements: [
                "Surat bukti ahli waris", 
                "Sertifikat asli hak atas tanah", 
                "Surat kuasa (jika dikuasakan)", 
                "Dokumen identitas ahli waris", 
                "Surat pernyataan dari ahli waris lainnya (jika diperlukan)"
            ] 
        }
    ],
    lainnya: [
        { 
            id: 10, 
            name: "Pengecekan Sertifikat", 
            requirements: [
                "KTP pemilik sertifikat", 
                "Sertifikat asli", 
                "Dokumen pendukung kepemilikan (jika ada)"
            ] 
        },
        { 
            id: 11, 
            name: "Roya", 
            requirements: [
                "Surat Roya dari bank", 
                "Fotokopi KTP dan KK pemilik", 
                "Dokumen bukti pembayaran utang (jika ada)"
            ] 
        },
        { 
            id: 12, 
            name: "Balik Nama Sertifikat", 
            requirements: [
                "Sertifikat asli", 
                "Fotokopi KTP, KK, dan NPWP penjual serta pembeli", 
                "Fotokopi Buku Nikah (jika menikah)", 
                "Dokumen bukti kepemilikan tanah"
            ] 
        },
        { 
            id: 13, 
            name: "Pengurusan Perpajakan", 
            requirements: [
                "Fotokopi SPPT PBB", 
                "Fotokopi KTP dan bukti kepemilikan tanah", 
                "Surat pernyataan tidak terutang pajak"
            ] 
        },
        { 
            id: 14, 
            name: "Pengurusan Perijinan Perusahaan", 
            requirements: [
                "NPWP, SIUP, TDP", 
                "Akta Pendirian", 
                "Dokumen rencana usaha", 
                "Surat keterangan domisili perusahaan"
            ] 
        }
    ]
};


function updateServices() {
    const category = document.getElementById('service-category').value;
    const serviceSelect = document.getElementById('service-select');
    
    // Clear previous options
    serviceSelect.innerHTML = '<option value="">Pilih Layanan</option>';
    
    if (category) {
        const availableServices = services[category];
        availableServices.forEach(service => {
            const option = document.createElement('option');
            option.value = service.id;
            option.textContent = service.name;
            serviceSelect.appendChild(option);
        });
    }
}

function showRequirements() {
    const serviceSelect = document.getElementById('service-select');
    const requirementsSection = document.getElementById('requirements-section');
    const requirementsList = document.getElementById('requirements-list');

    // Clear previous requirements
    requirementsList.innerHTML = '';

    if (serviceSelect.value) {
        const selectedService = services[document.getElementById('service-category').value]
            .find(service => service.id == serviceSelect.value);

        selectedService.requirements.forEach(requirement => {
            const listItem = document.createElement('li');
            listItem.textContent = requirement;
            requirementsList.appendChild(listItem);
        });

        requirementsSection.style.display = 'block';
    } else {
        requirementsSection.style.display = 'none';
    }
}

function submitRequirements() {
    const serviceSelect = document.getElementById('service-select');
    const selectedService = services[document.getElementById('service-category').value]
        .find(service => service.id == serviceSelect.value);

    if (selectedService) {
        const requirements = selectedService.requirements.join(', ');
        const message = `Layanan: ${selectedService.name}\n\nPersyaratan:\n${requirements}\n\nPermohonan telah dikirim!`;

        // Replace 'YOUR_PHONE_NUMBER' with your actual WhatsApp number (in international format)
        const whatsappNumber = '+6281321245011';
        const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

        // Open WhatsApp
        window.open(whatsappLink, '_blank');
    } else {
        alert('Silakan pilih layanan yang valid.');
    }
}

