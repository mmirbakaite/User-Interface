document.addEventListener('DOMContentLoaded', function() {
  const asmensKodasInput = document.getElementById('asmensKodas');
  const gimimoDataInput = document.getElementById('gimimoData');
  const issilavinimasInput = document.getElementById('issilavinimas');
  const kvalifikacijaField = document.getElementById('kvalifikacijaField');
  const moksloLaipsnisField = document.getElementById('moksloLaipsnisField');
  const vedybinePadeTisInput = document.getElementById('vedybinePadeTis');
  const vedybinePadeTisField = document.getElementById('vedybinePadeTisField');
  const spouseField = document.getElementById('spouseField');
  const profesinePadetisInput = document.getElementById('profesinePadetis');
  const studijuPakopaField = document.getElementById('studijuPakopaField');
  const kursasField = document.getElementById('kursasField');
  const studijuIstaigaField = document.getElementById('studijuIstaigaField');
  const tiketiniBaigimoMetaiField = document.getElementById('tiketiniBaigimoMetaiField');
  const darboPatirtisField = document.getElementById('darboPatirtisField');
  const darboSritisField = document.getElementById('darboSritisField');
  const nedarboPriezastisField = document.getElementById('nedarboPriezastisField');
  const atostoguPabaigaField = document.getElementById('atostoguPabaigaField');
  const containerField = document.getElementById('containerField');
  const page1 = document.getElementById('page1');
  const page2 = document.getElementById('page2');
  const page3 = document.getElementById('page3');
  const successMessage = document.getElementById('successMessage');
  const anketaFormPage2 = document.getElementById('AnketaPage2');
  const nextButton = document.getElementById('nextButton');
  const prevButton = document.getElementById('prevButton');;
  const formPages = [page1, page2, page3]; 
  const progressBar = document.getElementById('progressBar');
  let currentPage = 0;
  const totalPages = formPages.length - 1;

  function updateProgressBar() {
    if (currentPage === totalPages) {
      progressBar.value = 100; 
    } else {
      const progressValue = (currentPage / totalPages) * 100;
      progressBar.value = progressValue;
    }
  }
  
  nextButton.addEventListener('click', function(event) {
    event.preventDefault();
    if (currentPage < totalPages) {
      formPages[currentPage].style.display = 'none';
      currentPage++;
      formPages[currentPage].style.display = 'block';
      updateProgressBar();
    }
  });
  
  prevButton.addEventListener('click', function(event) {
    event.preventDefault();
    if (currentPage > 0) {
      formPages[currentPage].style.display = 'none';
      currentPage--;
      formPages[currentPage].style.display = 'block';
      updateProgressBar();
    }
  })

  nextButton.addEventListener('click', function(event) {
    event.preventDefault(); 
    page1.style.display = 'none'; 
    page2.style.display = 'block'; 
  });

  prevButton.addEventListener('click', function(event) {
    event.preventDefault(); 
    page2.style.display = 'none'; 
    page1.style.display = 'block'; 
  });

anketaFormPage2.addEventListener('submit', function(event) {
  event.preventDefault(); 
  page2.style.display = 'none';
  successMessage.style.display = 'block'; 
  page3.style.display = 'block'; 
  progressBar.value = 100;
});

  anketaFormPage2.addEventListener('submit', function(event) {
    event.preventDefault(); 
    page2.style.display = 'none';
    successMessage.style.display = 'block'; 
    page3.style.display = 'block'; 
  });

  function showField(field, display) {
    field.style.display = display;
  }

function calculateAge(birthDate) {
  const today = new Date();
  const dob = new Date(birthDate);
  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--;
  } 
  return age;
}

asmensKodasInput.addEventListener('input', function() {
  const asmensKodasValue = this.value;
  if (asmensKodasValue.length === 11) {
    const birthYear = asmensKodasValue.substring(1, 3);
    const birthMonth = asmensKodasValue.substring(3, 5);
    const birthDay = asmensKodasValue.substring(5, 7);
    const fullBirthDate = `20${birthYear}-${birthMonth}-${birthDay}`;
    const age = calculateAge(fullBirthDate);
        gimimoDataInput.value = fullBirthDate;
    if (age >= 16 && asmensKodasValue.length === 11) {
      showField(containerField, 'block');
    } else {
      showField(containerField, 'none');
    }
  } 
});

  vedybinePadeTisInput.addEventListener('change', function() {
    const selectedValue = this.value;
    if (selectedValue === 'vedęs/ištekėjusi') {
      showField(spouseField, 'block');
    } else {
      showField(spouseField, 'none');
    }
  });

  kvalifikacijaField.style.display = 'none';
  moksloLaipsnisField.style.display = 'none';
  issilavinimasInput.addEventListener('change', function() {
    const selectedValue = this.value;
    if (selectedValue == 'pagrindinis' || selectedValue === 'vidurinis' || selectedValue === 'profesinis' || selectedValue === 'pasirinkti') {
      showField(kvalifikacijaField, 'none');
      showField(moksloLaipsnisField, 'none');
    } else {
      showField(kvalifikacijaField, 'block');
      showField(moksloLaipsnisField, 'block');
    }
  });

  profesinePadetisInput.addEventListener('change', function() {
    const selectedValue = this.value;
      if (selectedValue === 'studijuoja') {
        showField(studijuPakopaField, 'block');
        showField(kursasField, 'block');
        showField(studijuIstaigaField, 'block');
        showField(tiketiniBaigimoMetaiField, 'block');
      } else {
        showField(studijuPakopaField, 'none');
        showField(kursasField, 'none');
        showField(studijuIstaigaField, 'none');
        showField(tiketiniBaigimoMetaiField, 'none');
      }
    });

    profesinePadetisInput.addEventListener('change', function() {
      const selectedValue = this.value;
      if (selectedValue === 'dirba') {
        showField(darboPatirtisField, 'block');
        showField(darboSritisField, 'block');
      } else {
        showField(darboPatirtisField, 'none');
        showField(darboSritisField, 'none');
      }
    });

    profesinePadetisInput.addEventListener('change', function() {
      const selectedValue = this.value;
      if (selectedValue === 'nedirba') {
        showField(nedarboPriezastisField, 'block');
      } else {
        showField(nedarboPriezastisField, 'none');
      }
    });

    profesinePadetisInput.addEventListener('change', function() {
      const selectedValue = this.value;
      if (selectedValue === 'atostogose') {
        showField(atostoguPabaigaField, 'block');
      } else {
        showField(atostoguPabaigaField, 'none');
      }
    });
});



