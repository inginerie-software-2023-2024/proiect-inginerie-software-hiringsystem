export interface NavbarLinkOption {
    title: string
    description: string
    url: string
    restricted_to_roles?: ('anonymous' | 'candidate' | 'interviewer' | 'manager')[]
}

export interface NavbarLink {
    name: string,
    // BEHAVIOUR RECOMMANDATION clickUrl:
    // if click url is missing, it will try to take the first option,
    // if no option exists available for the user, then the whole link should not be displayed
    // if it exists but is set to null, nothing will happen when you click the link
    // but the link will not disappear if clickUrl is set to something
    clickUrl?: string | null,
    options: NavbarLinkOption[]
}