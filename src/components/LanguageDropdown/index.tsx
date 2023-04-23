import {
  INITIAL_LANGUAGE,
  LANGUAGE,
  SUPPORTED_LANGUAGES,
} from '@/utils/constants'
import { useState } from 'react'

export interface LanguageDropdownProps {
  onChange: (language: string) => void
}

export const LanguageDropdown: React.FC<LanguageDropdownProps> = ({
  onChange,
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState<LANGUAGE>(
    INITIAL_LANGUAGE,
  )
  const [showMenu, setShowMenu] = useState<boolean>(false)

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          id="language-menu"
          aria-haspopup="true"
          aria-expanded="true"
          onClick={() => setShowMenu((v) => !v)}
        >
          {`Language: ${selectedLanguage.title}`}
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10.2929 14.2929C10.6834 13.9024 11.3166 13.9024 11.7071 14.2929L15.7071 18.2929C16.0976 18.6834 16.0976 19.3166 15.7071 19.7071C15.3166 20.0976 14.6834 20.0976 14.2929 19.7071L10 15.4142L5.70711 19.7071C5.31658 20.0976 4.68342 20.0976 4.29289 19.7071C3.90237 19.3166 3.90237 18.6834 4.29289 18.2929L8.29289 14.2929C8.68342 13.9024 9.31658 13.9024 9.70711 14.2929L9.70711 14.2929ZM10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      {showMenu && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="language-menu"
        >
          <div className="py-1" role="none">
            {SUPPORTED_LANGUAGES.map((language) => (
              <button
                key={language.value}
                value={language.value}
                className={`${
                  language.value === selectedLanguage.value
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-700'
                } block w-full text-left px-4 py-2 text-sm`}
                role="menuitem"
                onClick={() => {
                  setSelectedLanguage(language)
                  onChange(language.value)
                  setShowMenu(false)
                }}
              >
                {language.title}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
