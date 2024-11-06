// Regular expressions for validation
export const strRegex = /^[a-zA-Z\s]*$/;
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
const digitRegex = /^\d+$/;

const mainForm = document.getElementById('cv-form') as HTMLFormElement;
const validType = {
    TEXT: 'text',
    TEXT_EMP: 'text_emp',
    EMAIL: 'email',
    DIGIT: 'digit',
    PHONENO: 'phoneno',
    ANY: 'any',
};

const firstnameElem = mainForm.elements.namedItem('firstname') as HTMLInputElement,    middlenameElem = mainForm.middlename as HTMLInputElement,
    lastnameElem = mainForm.lastname as HTMLInputElement,
    imageElem = mainForm.image as HTMLInputElement,
    designationElem = mainForm.designation as HTMLInputElement,
    addressElem = mainForm.address as HTMLInputElement,
    emailElem = mainForm.email as HTMLInputElement,
    phonenoElem = mainForm.phoneno as HTMLInputElement,
    summaryElem = mainForm.summary as HTMLTextAreaElement;

const nameDsp = document.getElementById('fullname_dsp') as HTMLElement,
    imageDsp = document.getElementById('image_dsp') as HTMLImageElement,
    phonenoDsp = document.getElementById('phoneno_dsp') as HTMLElement,
    emailDsp = document.getElementById('email_dsp') as HTMLElement,
    addressDsp = document.getElementById('address_dsp') as HTMLElement,
    designationDsp = document.getElementById('designation_dsp') as HTMLElement,
    summaryDsp = document.getElementById('summary_dsp') as HTMLElement,
    projectsDsp = document.getElementById('projects_dsp') as HTMLElement,
    achievementsDsp = document.getElementById('achievements_dsp') as HTMLElement,
    skillsDsp = document.getElementById('skills_dsp') as HTMLElement,
    educationsDsp = document.getElementById('educations_dsp') as HTMLElement,
    experiencesDsp = document.getElementById('experiences_dsp') as HTMLElement;

const fetchValues = (attrs: string[], ...nodeLists: NodeListOf<HTMLInputElement | HTMLTextAreaElement>[]) => {
    const elemsAttrsCount = nodeLists.length;
    const elemsDataCount = nodeLists[0].length;
    const tempDataArr: { [key: string]: string }[] = [];

    for (let i = 0; i < elemsDataCount; i++) {
        const dataObj: { [key: string]: string } = {};
        for (let j = 0; j < elemsAttrsCount; j++) {
            dataObj[attrs[j]] = nodeLists[j][i].value;
        }
        tempDataArr.push(dataObj);
    }
    return tempDataArr;
};
const getUserInputs = () => {
    const achievementsTitleElem = document.querySelectorAll('.achieve_title') as NodeListOf<HTMLInputElement>,
        achievementsDescriptionElem = document.querySelectorAll('.achieve_description') as NodeListOf<HTMLTextAreaElement>,
        expTitleElem = document.querySelectorAll('.exp_title') as NodeListOf<HTMLInputElement>,
        expOrganizationElem = document.querySelectorAll('.exp_organization') as NodeListOf<HTMLInputElement>,
        expLocationElem = document.querySelectorAll('.exp_location') as NodeListOf<HTMLInputElement>,
        expStartDateElem = document.querySelectorAll('.exp_start_date') as NodeListOf<HTMLInputElement>,
        expEndDateElem = document.querySelectorAll('.exp_end_date') as NodeListOf<HTMLInputElement>,
        expDescriptionElem = document.querySelectorAll('.exp_description') as NodeListOf<HTMLTextAreaElement>,
        eduSchoolElem = document.querySelectorAll('.edu_school') as NodeListOf<HTMLInputElement>,
        eduDegreeElem = document.querySelectorAll('.edu_degree') as NodeListOf<HTMLInputElement>,
        eduCityElem = document.querySelectorAll('.edu_city') as NodeListOf<HTMLInputElement>,
        eduStartDateElem = document.querySelectorAll('.edu_start_date') as NodeListOf<HTMLInputElement>,
        eduGraduationDateElem = document.querySelectorAll('.edu_graduation_date') as NodeListOf<HTMLInputElement>,
        eduDescriptionElem = document.querySelectorAll('.edu_description') as NodeListOf<HTMLTextAreaElement>,
        projTitleElem = document.querySelectorAll('.proj_title') as NodeListOf<HTMLInputElement>,
        projLinkElem = document.querySelectorAll('.proj_link') as NodeListOf<HTMLInputElement>,
        projDescriptionElem = document.querySelectorAll('.proj_description') as NodeListOf<HTMLTextAreaElement>,
        skillElem = document.querySelectorAll('.skill') as NodeListOf<HTMLInputElement>;

    firstnameElem.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.TEXT, 'First Name'));
    middlenameElem.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.TEXT_EMP, 'Middle Name'));
    lastnameElem.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.TEXT, 'Last Name'));
    phonenoElem.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.PHONENO, 'Phone Number'));
    emailElem.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.EMAIL, 'Email'));
    addressElem.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.ANY, 'Address'));
    designationElem.addEventListener('keyup', (e) => validateFormData(e.target as HTMLInputElement, validType.TEXT, 'Designation'));

    return {
        firstname: firstnameElem.value,
        middlename: middlenameElem.value,
        lastname: lastnameElem.value,
        designation: designationElem.value,
        address: addressElem.value,
        email: emailElem.value,
        phoneno: phonenoElem.value,
        summary: summaryElem.value,
        achievements: fetchValues(['achieve_title', 'achieve_description'], achievementsTitleElem, achievementsDescriptionElem),
        experiences: fetchValues(['exp_title', 'exp_organization', 'exp_location', 'exp_start_date', 'exp_end_date', 'exp_description'], expTitleElem, expOrganizationElem, expLocationElem, expStartDateElem, expEndDateElem, expDescriptionElem),
        educations: fetchValues(['edu_school', 'edu_degree', 'edu_city', 'edu_start_date', 'edu_graduation_date', 'edu_description'], eduSchoolElem, eduDegreeElem, eduCityElem, eduStartDateElem, eduGraduationDateElem, eduDescriptionElem),
        projects: fetchValues(['proj_title', 'proj_link', 'proj_description'], projTitleElem, projLinkElem, projDescriptionElem),
        skills: fetchValues(['skill'], skillElem)
    };
};

function validateFormData(elem: HTMLInputElement | HTMLTextAreaElement, elemType: string, elemName: string) {
    const isValid = {
        [validType.TEXT]: strRegex.test(elem.value) && elem.value.trim().length > 0,
        [validType.TEXT_EMP]: strRegex.test(elem.value),
        [validType.EMAIL]: emailRegex.test(elem.value) && elem.value.trim().length > 0,
        [validType.PHONENO]: phoneRegex.test(elem.value) && elem.value.trim().length > 0,
        [validType.ANY]: elem.value.trim().length > 0
    }[elemType];

    isValid ? removeErrMsg(elem) : addErrMsg(elem, elemName);
}

function addErrMsg(formElem: HTMLElement, formElemName: string) {
    formElem.nextElementSibling!.innerHTML = `${formElemName} is invalid`;
}

function removeErrMsg(formElem: HTMLElement) {
    formElem.nextElementSibling!.innerHTML = "";
}

const showListData = (listData: any[], listContainer: HTMLElement) => {
    listContainer.innerHTML = "";
    listData.forEach(listItem => {
        const itemElem = document.createElement('div');
        itemElem.classList.add('preview-item');
        
        for (const key in listItem) {
            const subItemElem = document.createElement('span');
            subItemElem.classList.add('preview-item-val');
            subItemElem.innerHTML = `${listItem[key]}`;
            itemElem.appendChild(subItemElem);
        }

        listContainer.appendChild(itemElem);
    });
};

const displayCV = (userData: ReturnType<typeof getUserInputs>) => {
    nameDsp.innerHTML = `${userData.firstname} ${userData.middlename} ${userData.lastname}`;
    phonenoDsp.innerHTML = userData.phoneno;
    emailDsp.innerHTML = userData.email;
    addressDsp.innerHTML = userData.address;
    designationDsp.innerHTML = userData.designation;
    summaryDsp.innerHTML = userData.summary;
    showListData(userData.projects, projectsDsp);
    showListData(userData.achievements, achievementsDsp);
    showListData(userData.skills, skillsDsp);
    showListData(userData.educations, educationsDsp);
    showListData(userData.experiences, experiencesDsp);
};
