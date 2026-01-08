import {
  Document,
  Page,
  View,
  Text,
  Image,
  Link,
  StyleSheet,
} from '@react-pdf/renderer';
import type { CVData, CVLanguageCode } from '../../../data/cv-data';
import { sectionLabels } from '../../../data/cv-data';

// Using Helvetica (built-in PDF font) for reliable rendering
// Custom fonts can be added later if needed

// Professional Light Theme Colors
const colors = {
  background: '#FFFFFF',
  primary: '#1A1A1A',
  secondary: '#4A4A4A',
  tertiary: '#666666',
  accent: '#E8DCC4',
  accentDark: '#D4C8A8',
  border: '#E5E5E5',
  skillTrack: '#EEEEEE',
};

// PDF Styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    paddingBottom: 50,
    fontFamily: 'Helvetica',
    fontSize: 10,
    color: colors.primary,
    backgroundColor: colors.background,
  },
  // Header
  header: {
    flexDirection: 'row',
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: colors.accent,
    paddingBottom: 16,
  },
  headerLeft: {
    flex: 1,
  },
  headerRight: {
    width: 70,
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  },
  photo: {
    width: 65,
    height: 65,
    borderRadius: 32,
    objectFit: 'cover',
  },
  name: {
    fontSize: 22,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 3,
    color: colors.primary,
  },
  title: {
    fontSize: 12,
    color: colors.secondary,
    marginBottom: 6,
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    fontSize: 8,
    color: colors.tertiary,
  },
  contactItem: {
    marginRight: 12,
  },
  contactLink: {
    color: colors.tertiary,
    textDecoration: 'none',
  },
  // Sections
  section: {
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: colors.primary,
    borderLeftWidth: 3,
    borderLeftColor: colors.accent,
    paddingLeft: 8,
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  // Experience
  experienceItem: {
    marginBottom: 12,
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 2,
  },
  experienceTitle: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: colors.primary,
  },
  experiencePeriod: {
    fontSize: 9,
    color: colors.tertiary,
  },
  experienceCompany: {
    fontSize: 10,
    color: colors.secondary,
    marginBottom: 4,
  },
  experienceDescription: {
    fontSize: 9,
    color: colors.secondary,
    lineHeight: 1.4,
    marginBottom: 4,
  },
  highlightsList: {
    marginLeft: 8,
  },
  highlightItem: {
    fontSize: 9,
    color: colors.secondary,
    marginBottom: 2,
    lineHeight: 1.3,
  },
  bulletPoint: {
    color: colors.accent,
    marginRight: 4,
  },
  // Skills
  skillsContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  skillCategory: {
    flex: 1,
  },
  skillCategoryTitle: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: colors.secondary,
    marginBottom: 6,
  },
  skillItem: {
    marginBottom: 5,
  },
  skillName: {
    fontSize: 8,
    color: colors.primary,
    marginBottom: 2,
  },
  skillBarContainer: {
    height: 4,
    backgroundColor: colors.skillTrack,
    borderRadius: 2,
  },
  skillBar: {
    height: 4,
    backgroundColor: colors.accent,
    borderRadius: 2,
  },
  // Two Column Layout
  twoColumn: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 14,
  },
  column: {
    flex: 1,
  },
  // Education
  educationItem: {
    marginBottom: 8,
  },
  educationPeriod: {
    fontSize: 8,
    color: colors.tertiary,
    marginBottom: 1,
  },
  educationDegree: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: colors.primary,
    marginBottom: 1,
  },
  educationInstitution: {
    fontSize: 9,
    color: colors.secondary,
    marginBottom: 2,
  },
  educationDescription: {
    fontSize: 8,
    color: colors.tertiary,
    fontStyle: 'italic',
  },
  // Certifications
  certItem: {
    fontSize: 9,
    color: colors.secondary,
    marginBottom: 3,
  },
  // Languages
  languagesSection: {
    marginTop: 6,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  languagesLabel: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: colors.primary,
    marginRight: 8,
  },
  languageItem: {
    fontSize: 9,
    color: colors.secondary,
  },
  languageLevel: {
    color: colors.tertiary,
  },
  // Footer
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 40,
    right: 40,
    textAlign: 'center',
    fontSize: 7,
    color: colors.tertiary,
  },
});

interface CVDocumentProps {
  data: CVData;
  language: CVLanguageCode;
  photoBase64?: string;
}

export function CVDocument({ data, language, photoBase64 }: CVDocumentProps) {
  const labels = sectionLabels[language];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.name}>{data.meta.name}</Text>
            <Text style={styles.title}>
              {data.meta.title} | {data.meta.subtitle}
            </Text>
            <View style={styles.contactRow}>
              <Link src={`mailto:${data.meta.email}`} style={styles.contactLink}>
                <Text style={styles.contactItem}>{data.meta.email}</Text>
              </Link>
              <Link src={`https://${data.meta.website}`} style={styles.contactLink}>
                <Text style={styles.contactItem}>{data.meta.website}</Text>
              </Link>
              <Link src={`https://${data.meta.linkedin}`} style={styles.contactLink}>
                <Text style={styles.contactItem}>{data.meta.linkedin}</Text>
              </Link>
              <Text style={styles.contactItem}>{data.meta.location}</Text>
            </View>
          </View>
          {photoBase64 && (
            <View style={styles.headerRight}>
              <Image src={photoBase64} style={styles.photo} />
            </View>
          )}
        </View>

        {/* Experience Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{labels.experience}</Text>
          {data.experience.map((job, index) => (
            <View key={index} style={styles.experienceItem}>
              <View style={styles.experienceHeader}>
                <Text style={styles.experienceTitle}>{job.title}</Text>
                <Text style={styles.experiencePeriod}>{job.period}</Text>
              </View>
              <Text style={styles.experienceCompany}>
                {job.company}, {job.location}
              </Text>
              <Text style={styles.experienceDescription}>{job.description}</Text>
              <View style={styles.highlightsList}>
                {job.highlights.map((highlight, hIndex) => (
                  <Text key={hIndex} style={styles.highlightItem}>
                    <Text style={styles.bulletPoint}>•</Text> {highlight}
                  </Text>
                ))}
              </View>
            </View>
          ))}
        </View>

        {/* Skills Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{labels.skills}</Text>
          <View style={styles.skillsContainer}>
            {data.skills.map((category, cIndex) => (
              <View key={cIndex} style={styles.skillCategory}>
                <Text style={styles.skillCategoryTitle}>{category.category}</Text>
                {category.items.map((skill, sIndex) => (
                  <View key={sIndex} style={styles.skillItem}>
                    <Text style={styles.skillName}>{skill.name}</Text>
                    <View style={styles.skillBarContainer}>
                      <View
                        style={[styles.skillBar, { width: `${skill.level}%` }]}
                      />
                    </View>
                  </View>
                ))}
              </View>
            ))}
          </View>
        </View>

        {/* Education & Certifications - Two Columns */}
        <View style={styles.twoColumn}>
          <View style={styles.column}>
            <Text style={styles.sectionTitle}>{labels.education}</Text>
            {data.education.map((edu, index) => (
              <View key={index} style={styles.educationItem}>
                <Text style={styles.educationPeriod}>{edu.period}</Text>
                <Text style={styles.educationDegree}>{edu.degree}</Text>
                <Text style={styles.educationInstitution}>{edu.institution}</Text>
                <Text style={styles.educationDescription}>{edu.description}</Text>
              </View>
            ))}
          </View>
          <View style={styles.column}>
            <Text style={styles.sectionTitle}>{labels.certifications}</Text>
            {data.certifications.map((cert, index) => (
              <Text key={index} style={styles.certItem}>
                <Text style={styles.bulletPoint}>•</Text> {cert}
              </Text>
            ))}
          </View>
        </View>

        {/* Languages */}
        <View style={styles.languagesSection}>
          <Text style={styles.languagesLabel}>{labels.languages}:</Text>
          {data.languages.map((lang, index) => (
            <Text key={index} style={styles.languageItem}>
              {lang.name} <Text style={styles.languageLevel}>({lang.level})</Text>
              {index < data.languages.length - 1 ? '   |   ' : ''}
            </Text>
          ))}
        </View>

        {/* Footer */}
        <Text style={styles.footer}>
          Generated from noah-kellner.de
        </Text>
      </Page>
    </Document>
  );
}

export default CVDocument;
