const defaultConfig = {
  profile_name: "Seu Nome",
  profile_title: "Seu Título ou Profissão",
  about_text: "Olá! Bem-vindo à minha página pessoal. Aqui você pode conhecer um pouco mais sobre mim, minha personalidade e meus interesses. Sinta-se à vontade para explorar as diferentes abas e descobrir mais sobre quem eu sou!",
  // 'personality_text' removido do defaultConfig
  interests_text: "Tenho diversos interesses que vão desde tecnologia e design até música e viagens. Adoro explorar novas culturas, experimentar diferentes culinárias e me manter atualizado com as últimas tendências. Nos momentos livres, gosto de ler, assistir filmes e passar tempo com amigos e família.",
  background_color: "#667eea",
  primary_color: "#a855f7",
  text_color: "#ffffff",
  card_color: "rgba(255, 255, 255, 0.15)",
  accent_color: "#c084fc",
  font_family: "Segoe UI",
  font_size: 16
};

async function onConfigChange(config) {
  const profileName = config.profile_name || defaultConfig.profile_name;
  const profileTitle = config.profile_title || defaultConfig.profile_title;
  const aboutText = config.about_text || defaultConfig.about_text;
  // const personalityText = config.personality_text || defaultConfig.personality_text; // Linha removida
  const interestsText = config.interests_text || defaultConfig.interests_text;
  const backgroundColor = config.background_color || defaultConfig.background_color;
  const primaryColor = config.primary_color || defaultConfig.primary_color;
  const textColor = config.text_color || defaultConfig.text_color;
  const cardColor = config.card_color || defaultConfig.card_color;
  const accentColor = config.accent_color || defaultConfig.accent_color;
  const fontFamily = config.font_family || defaultConfig.font_family;
  const fontSize = config.font_size || defaultConfig.font_size;

  document.getElementById('profileName').textContent = profileName;
  document.getElementById('profileTitle').textContent = profileTitle;
  document.getElementById('aboutText').textContent = aboutText;
  // document.getElementById('personalityText').textContent = personalityText; // Linha removida
  document.getElementById('interestsText').textContent = interestsText;

  document.body.style.background = `linear-gradient(135deg, ${backgroundColor} 0%, ${primaryColor} 100%)`;
  document.body.style.color = textColor;
  document.body.style.fontFamily = `${fontFamily}, 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`;
  document.body.style.fontSize = `${fontSize}px`;

  const contentArea = document.querySelector('.content-area');
  if (contentArea) {
    contentArea.style.background = cardColor;
  }

  const profilePhoto = document.getElementById('profilePhoto');
  if (profilePhoto) {
    profilePhoto.style.background = `linear-gradient(135deg, ${accentColor} 0%, ${primaryColor} 100%)`;
  }

  const activeTabButton = document.querySelector('.tab-button.active');
  if (activeTabButton) {
    activeTabButton.style.background = primaryColor;
    activeTabButton.style.borderColor = primaryColor;
  }

  const headers = document.querySelectorAll('.header h1, .tab-content h2');
  headers.forEach(header => {
    header.style.fontSize = `${fontSize * 2}px`;
  });

  const paragraphs = document.querySelectorAll('.header p, .tab-content p');
  paragraphs.forEach(p => {
    p.style.fontSize = `${fontSize * 1.125}px`;
  });

  const tabButtons = document.querySelectorAll('.tab-button');
  tabButtons.forEach(button => {
    button.style.fontSize = `${fontSize * 1.125}px`;
  });
}

function mapToCapabilities(config) {
  return {
    recolorables: [
      {
        get: () => config.background_color || defaultConfig.background_color,
        set: (value) => {
          config.background_color = value;
          if (window.elementSdk) {
            window.elementSdk.setConfig({ background_color: value });
          }
        }
      },
      {
        get: () => config.primary_color || defaultConfig.primary_color,
        set: (value) => {
          config.primary_color = value;
          if (window.elementSdk) {
            window.elementSdk.setConfig({ primary_color: value });
          }
        }
      },
      {
        get: () => config.text_color || defaultConfig.text_color,
        set: (value) => {
          config.text_color = value;
          if (window.elementSdk) {
            window.elementSdk.setConfig({ text_color: value });
          }
        }
      },
      {
        get: () => config.card_color || defaultConfig.card_color,
        set: (value) => {
          config.card_color = value;
          if (window.elementSdk) {
            window.elementSdk.setConfig({ card_color: value });
          }
        }
      },
      {
        get: () => config.accent_color || defaultConfig.accent_color,
        set: (value) => {
          config.accent_color = value;
          if (window.elementSdk) {
            window.elementSdk.setConfig({ accent_color: value });
          }
        }
      }
    ],
    borderables: [],
    fontEditable: {
      get: () => config.font_family || defaultConfig.font_family,
      set: (value) => {
        config.font_family = value;
        if (window.elementSdk) {
          window.elementSdk.setConfig({ font_family: value });
        }
      }
    },
    fontSizeable: {
      get: () => config.font_size || defaultConfig.font_size,
      set: (value) => {
        config.font_size = value;
        if (window.elementSdk) {
          window.elementSdk.setConfig({ font_size: value });
        }
      }
    }
  };
}

function mapToEditPanelValues(config) {
  return new Map([
    ["profile_name", config.profile_name || defaultConfig.profile_name],
    ["profile_title", config.profile_title || defaultConfig.profile_title],
    ["about_text", config.about_text || defaultConfig.about_text],
    // ["personality_text", config.personality_text || defaultConfig.personality_text], // Linha removida
    ["interests_text", config.interests_text || defaultConfig.interests_text]
  ]);
}

if (window.elementSdk) {
  window.elementSdk.init({
    defaultConfig,
    onConfigChange,
    mapToCapabilities,
    mapToEditPanelValues
  });
}

const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    const targetTab = button.getAttribute('data-tab');
    
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));
    
    button.classList.add('active');
    document.getElementById(targetTab).classList.add('active');

    if (window.elementSdk && window.elementSdk.config) {
      const primaryColor = window.elementSdk.config.primary_color || defaultConfig.primary_color;
      button.style.background = primaryColor;
      button.style.borderColor = primaryColor;
    }
  });
});